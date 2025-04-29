// Variables globales
let scene, camera, renderer, planet, currentPointIndex = 0;
let isPlaying = false;
let animationId = null;
let pointMarkers = [];
let targetPosition = new THREE.Vector3();
let clock = new THREE.Clock();
let shrimpModel;
let journeyStarted = false;

// Initialisation de Three.js
function init() {
  console.log("Initializing...");
  
  // Créer la scène
  scene = new THREE.Scene();
  
  // Créer la caméra
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(200, 200, 200);
  camera.lookAt(0, 0, 0);

  // Créer le renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000);
  document.getElementById('scene').appendChild(renderer.domElement);

  // Ajouter des lumières améliorées
  scene.add(new THREE.AmbientLight(0x404040));

  const sunLight = new THREE.DirectionalLight(0xffffff, 1);
  sunLight.position.set(10, 5, 7);
  scene.add(sunLight);

  // Add a subtle blue backlight to simulate atmospheric scattering
  const backLight = new THREE.DirectionalLight(0x4444ff, 0.3);
  backLight.position.set(-10, -5, -7);
  scene.add(backLight);

  // Créer la planète
  createPlanet();

  // Créer les étoiles
  createStars();

  // Créer les marqueurs de points
  createPointMarkers();

  // Créer le chemin du voyage
  createJourneyPath();

  // Gérer le redimensionnement de la fenêtre
  window.addEventListener('resize', onWindowResize);

  const loader = new THREE.GLTFLoader();
  loader.load('models/shrimp.glb', (gltf) => {
    shrimpModel = gltf.scene;
    console.log('Shrimp chargé !');
    shrimpModel.scale.set(4, 4, 4); // Ajuste selon ton modèle
    scene.add(shrimpModel);

    // Place au premier point si possible
    if (points.length > 0) {
      const start = new THREE.Vector3(
        (points[0].position.x,
        points[0].position.y,
        points[0].position.z)
      ).normalize().multiplyScalar(5.1);
      shrimpModel.position.copy(start);
    }
  }, undefined, (error) => {
    console.error('Erreur de chargement GLB', error);
  });
  
  // Démarrer l'animation
  animate();

  // Initialiser les contrôles
  initControls();

  // Mettre à jour l'interface utilisateur
  updateUI();

  // Masquer l'écran de chargement après un court délai
  console.log("Initialization complete, hiding loading screen...");
  setTimeout(() => {
    document.querySelector('.loading-screen').style.display = 'none';
    console.log("Loading screen should be hidden now");
  }, 1500);

  // Initialiser le panneau d'impact
  updateImpactPanel(0);

}

// Création des marqueurs de points améliorés
function createPointMarkers() {
  points.forEach((point, index) => {
    // Create a more interesting 3D marker
    const markerGroup = new THREE.Group();

    // Main marker sphere
    const markerGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const markerMaterial = new THREE.MeshPhongMaterial({
      color: 0x4fc3f7,
      emissive: 0x0288d1,
      emissiveIntensity: 0.5,
      shininess: 30
    });
    const marker = new THREE.Mesh(markerGeometry ,markerMaterial);
        // Add a pulsing ring
        const ringGeometry = new THREE.RingGeometry(0.2, 0.25, 32);
        const ringMaterial = new THREE.MeshBasicMaterial({ 
          color: 0x4fc3f7, 
          transparent: true,
          opacity: 0.7,
          side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeometry , ringMaterial);
        // ring.rotation.x = Math.PI / 2;
        
        // Add animation for the ring
        const pulseRing = () => {
          ring.scale.x = 1 + 0.2 * Math.sin(Date.now() * 0.003);
          ring.scale.y = 1 + 0.2 * Math.sin(Date.now() * 0.003);
          ring.scale.z = 1;
          ring.material.opacity = 0.7 * (0.5 + 0.5 * Math.sin(Date.now() * 0.003));
          requestAnimationFrame(pulseRing);
        };
        pulseRing();
        
        markerGroup.add(marker);
        markerGroup.add(ring);
        
        // Position the marker on the planet
        const position = new THREE.Vector3(point.position.x, point.position.y, point.position.z);
        const normalizedPosition = position.clone().normalize();
        markerGroup.position.copy(normalizedPosition.multiplyScalar(5.1));
        
        // Orient the marker to face outward from the planet center
        markerGroup.lookAt(normalizedPosition.multiplyScalar(10));
        
        scene.add(markerGroup);
        
        // Create HTML marker for interaction
        const pointMarker = document.createElement('div');
        pointMarker.className = 'point-marker';
        pointMarker.style.display = 'none';
        pointMarker.dataset.index = index;
        
        // Add a tooltip with the point title
        const tooltip = document.createElement('div');
        tooltip.className = 'marker-tooltip';
        tooltip.textContent = point.title;
        pointMarker.appendChild(tooltip);
        
        pointMarker.addEventListener('click', () => {
          goToPoint(index);
        });
        
        document.getElementById('container').appendChild(pointMarker);
        pointMarkers.push({ 
          threeDMarker: markerGroup, 
          htmlMarker: pointMarker 
        });
      });
    }
    
    // Création du chemin du voyage amélioré
    function createJourneyPath() {
      console.log("Creating journey path...");
      
      // Create a tube along the path instead of a simple line
      const pathPoints = [];
      for (let i = 0; i < points.length; i++) {
        const pos = points[i].position;
        const normalizedPos = new THREE.Vector3(pos.x, pos.y, pos.z).normalize().multiplyScalar(5.2);
        pathPoints.push(normalizedPos);
      }
      
      // Create a smooth curve through all points
      const curve = new THREE.CatmullRomCurve3(pathPoints);
      curve.tension = 0.3; // Adjust for smoother curve
      
      // Create tube geometry along the curve
      const tubeGeometry = new THREE.TubeGeometry(
        curve,
        64,  // tubular segments
        0.05, // radius
        8,    // radial segments
        false // closed
      );
      
      // Create gradient material
      const tubeMaterial = new THREE.MeshPhongMaterial({
        color: 0xff5252,
        emissive: 0xff5252,
        emissiveIntensity: 0.3,
        shininess: 30
      });
      
      const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
      scene.add(tube);
      
      // Add animated particles along the path
      const particleCount = 50;
      const particleGeometry = new THREE.SphereGeometry(0.03, 8, 8);
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
      });
      
      const particles = [];
      for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        scene.add(particle);
        particles.push({
          mesh: particle,
          speed: 0.0005 + Math.random() * 0.001,
          progress: Math.random()
        });
      }
      
      // Animation function for particles
      function animateParticles() {
        particles.forEach(p => {
          p.progress += p.speed;
          if (p.progress > 1) p.progress = 0;
          
          const point = curve.getPointAt(p.progress);
          p.mesh.position.copy(point);
          
          // Fade particles based on progress
          p.mesh.material.opacity = 0.8 * Math.sin(p.progress * Math.PI);
        });
        
        requestAnimationFrame(animateParticles);
      }
      
      animateParticles();
      
      console.log("Journey path created");
    }

    // Initialisation des contrôles
    function initControls() {
      document.getElementById('prev-btn').addEventListener('click', () => {
        if (currentPointIndex > 0) {
          pauseAnimation();
          goToPoint(currentPointIndex - 1);
        }
      });
      
      document.getElementById('next-btn').addEventListener('click', () => {
        console.log("Next button clicked, currentPointIndex:", currentPointIndex, "points.length:", points.length);
        if (currentPointIndex < points.length - 1) {
          pauseAnimation();
          goToPoint(currentPointIndex + 1);
        } else if (currentPointIndex === points.length - 1) {
          console.log("Showing awareness popup");
          showAwarenessPopup();
        }
      });
      
      document.getElementById('play-btn').addEventListener('click', togglePlayPause);
      
      // Add event listener for the start journey button if it exists
      const startButton = document.getElementById('start-journey');
      if (startButton) {
        startButton.addEventListener('click', function () {
          document.getElementById('title-overlay').style.display = 'none';
          journeyStarted = true; // ➔ Commencer le voyage officiellement
          goToPoint(0);        });
      }
    }    
    
    // Fonction pour aller à un point spécifique
    function goToPoint(index) {
      currentPointIndex = index;
      updateUI();
      
      // Définir la position cible
      targetPosition = new THREE.Vector3(
        points[index].position.x,
        points[index].position.y,
        points[index].position.z
      );
      
      // Déplacer le modèle shrimp vers le prochain point
      if (shrimpModel) {
        const destination = new THREE.Vector3(
          points[index].position.x,
          points[index].position.y,
          points[index].position.z
        ).normalize().multiplyScalar(5.1);
        shrimpModel.userData.destination = destination;
      }
    
      // Afficher les infos du point
      showPointInfo(index);
      
      // Update impact panel
      updateImpactPanel(index);
    }
    
    
    // Afficher les informations d'un point avec animation
    function showPointInfo(index) {
      const infoPanel = document.getElementById('info-panel');
      
      // First hide the panel with a fade out effect
      infoPanel.style.opacity = 0;
      
      // After a short delay, update content and fade back in
      setTimeout(() => {
        infoPanel.querySelector('h2').textContent = points[index].title;
        document.getElementById('info-content').innerHTML = points[index].content;
        
        // Show with a slide-in effect
        infoPanel.style.display = 'block';
        infoPanel.style.transform = 'translateX(20px)';
        infoPanel.style.opacity = 0;
        
        setTimeout(() => {
          infoPanel.style.transition = 'all 0.5s ease';
          infoPanel.style.transform = 'translateX(0)';
          infoPanel.style.opacity = 1;
        }, 50);
      }, 300);
    }
    
    // Mise à jour du panneau d'impact environnemental
    function updateImpactPanel(index) {
      const impact = points[index].impact;
  
      if (impact) {
          // Update fill widths
          document.getElementById('carbon-impact').style.width = `${100 / 5.98 * impact.carbon}%`;
          document.getElementById('water-impact').style.width = `${100 / 20 * impact.water}%`;
          document.getElementById('energy-impact').style.width = `${100 / 23.69 * impact.energy}%`;
  
          // Update textual values
          document.getElementById('carbon-impact-value').textContent = `${impact.carbon.toFixed(2)} kg CO₂`;
          document.getElementById('water-impact-value').textContent = `${impact.water.toFixed(2)} m³`;
          document.getElementById('energy-impact-value').textContent = `${impact.energy.toFixed(2)} kWh`;
      }
  }
    
    // Mise à jour de l'interface utilisateur
    function updateUI() {
      const prevBtn = document.getElementById('prev-btn');
      const nextBtn = document.getElementById('next-btn');
      const playBtn = document.getElementById('play-btn');
      const locationIndicator = document.getElementById('location-indicator');
      const progressBar = document.getElementById('progress');
    
      // Mise à jour des boutons
      prevBtn.disabled = currentPointIndex === 0;
      
      // Don't disable the next button at the last point
      if (currentPointIndex === points.length - 1) {
        nextBtn.textContent = "Conclusion";
        nextBtn.disabled = false;
      } else {
        nextBtn.textContent = "Suivant →";
        nextBtn.disabled = false;
      }
    
      // Mise à jour du texte du bouton play/pause
      playBtn.textContent = isPlaying ? 'Pause' : (currentPointIndex === points.length - 1 ? 'Redémarrer' : 'Démarrer');
    
      // Mise à jour de l'indicateur de position
      locationIndicator.textContent = `Point ${currentPointIndex + 1}/${points.length} : ${points[currentPointIndex].title}`;
    
      // Mise à jour de la barre de progression
      const progress = (currentPointIndex / (points.length - 1)) * 100;
      progressBar.style.width = `${progress}%`;
    }    

    
    // Basculer entre lecture et pause
    function togglePlayPause() {
      if (isPlaying) {
        pauseAnimation();
      } else {
        if (currentPointIndex === points.length - 1) {
          // Redémarrer depuis le début
          currentPointIndex = 0;
          updateUI();
          showPointInfo(currentPointIndex);
          updateImpactPanel(currentPointIndex);
        }
        startAnimation();
      }
    }
    
    // Démarrer l'animation
    function startAnimation() {
      isPlaying = true;
      document.getElementById('play-btn').textContent = 'Pause';
      animateToNextPoint();
    }
    
    // Mettre en pause l'animation
    function pauseAnimation() {
      isPlaying = false;
      document.getElementById('play-btn').textContent = currentPointIndex === points.length - 1 ? 'Redémarrer' : 'Démarrer';
      if (animationId) {
        clearTimeout(animationId);
        animationId = null;
      }
    }
    
    // Animer vers le point suivant
    function animateToNextPoint() {
      if (currentPointIndex < points.length - 1) {
        goToPoint(currentPointIndex + 1);
        animationId = setTimeout(() => {
          if (isPlaying) {
            animateToNextPoint();
          }
        }, 8000); // 8 secondes par point pour laisser le temps de lire
      } else {
        pauseAnimation();
      }
    }
    
    // Animation principale
    function animate() {
      try {
        renderer.render(scene, camera);
        
        // Déplacer la caméra vers la position cible
        if (journeyStarted && targetPosition) {
          const camTargetPos = targetPosition.clone().normalize().multiplyScalar(15);
          camera.position.lerp(camTargetPos, 0.02);
          camera.lookAt(0, 0, 0);
        }
    
        // Déplacer doucement le shrimpModel vers sa destination
        if (shrimpModel && shrimpModel.userData.destination) {
          // Mouvement doux vers la destination
          shrimpModel.position.lerp(shrimpModel.userData.destination, 0.02);
        
          // Nouvelle direction dynamique
          const direction = shrimpModel.userData.destination.clone().sub(shrimpModel.position).normalize();
          
          if (direction.length() > 0) {
            // Calculer la "target" pour le lookAt
            const lookAtTarget = shrimpModel.position.clone().add(direction);
            shrimpModel.lookAt(lookAtTarget);
          }
        }
    
        requestAnimationFrame(animate);
      } catch (error) {
        console.error("Error in animation loop:", error);
        document.querySelector('.loading-screen h1').textContent = "Error in animation";
        document.querySelector('.loading-screen').style.display = 'block';
      }
    }
    
    
    // Gestion du redimensionnement de la fenêtre
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    // Failsafe to hide loading screen after timeout
    setTimeout(() => {
      const loadingScreen = document.querySelector('.loading-screen');
      if (loadingScreen && loadingScreen.style.display !== 'none') {
        console.log("Force hiding loading screen after timeout");
        loadingScreen.style.display = 'none';
      }
    }, 10000); // 10 seconds
    
    // Check if Three.js is loaded before initialization
    window.addEventListener('load', function() {
      if (typeof THREE === 'undefined') {
        console.error("Three.js is not loaded!");
        document.querySelector('.loading-screen h1').textContent = "Error: Three.js not loaded";
        return;
      }
      
      console.log("Three.js is loaded, starting initialization");
      init();
    });
    
    // Show awareness popup at the end of the journey
    function showAwarenessPopup() {
      const awarenessPopup = document.getElementById('awareness-popup');
      console.log("Popup element:", awarenessPopup);
      
      // First set display to flex (without the active class)
      awarenessPopup.style.display = 'flex';
      
      // Force a reflow before adding the active class
      void awarenessPopup.offsetWidth;
      
      // Then add the active class after a small delay to allow the browser to process the display change
      setTimeout(() => {
        awarenessPopup.classList.add('active');
        console.log("Added active class to popup");
      }, 50);
      
      // Setup event listeners for the popup
      document.getElementById('close-awareness-btn').addEventListener('click', () => {
        console.log("Close button clicked");
        awarenessPopup.classList.remove('active');
        
        // Wait for the opacity transition to complete before hiding
        setTimeout(() => {
          awarenessPopup.style.display = 'none';
        }, 500); // Match this to your CSS transition time
      });
      
      document.getElementById('learn-more-btn').addEventListener('click', () => {
        document.getElementById('learn-more-modal').style.display = 'flex';
      });
      
      document.getElementById('close-modal-btn').addEventListener('click', () => {
        document.getElementById('learn-more-modal').style.display = 'none';
      });
      
      document.getElementById('share-btn').addEventListener('click', () => {
        alert('Partagez cette expérience avec vos amis pour sensibiliser à l\'importance de consommer local !');
      });
      
      document.getElementById('restart-journey-btn').addEventListener('click', () => {
        awarenessPopup.classList.remove('active');
        
        // Wait for the opacity transition to complete before hiding
        setTimeout(() => {
          awarenessPopup.style.display = 'none';
          
          // Reset the journey to the beginning
          currentPointIndex = 0;
          updateUI();
          showPointInfo(0);
          updateImpactPanel(0);
        }, 500); // Match this to your CSS transition time
      });
    }
    