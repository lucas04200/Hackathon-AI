// Configuration data for the journey points
const points = [
  {
    title: "Pêche à Dakar (Sénégal)",
    position: { x: 6.5, y: 2, z: 2.0 },
    content: `
        <div class="info-stage">Étape 1: Départ de Dakar</div>
        <img src="images/crevette-congele.webp" alt="Pêche au Sénégal">
        <div class="info-description">
          <p>Les crevettes sont pêchées au large de Dakar, immédiatement triées, nettoyées, congelées et stockées en containers frigorifiques sur les navires.</p>
          <div class="info-stats">
            <div class="stat"><i class="stat-icon">📍</i> Distance: 0 km (origine)</div>
            <div class="stat"><i class="stat-icon">⏱️</i> Temps: 1-3 jours</div>
            <div class="stat"><i class="stat-icon">🌡️</i> Température: -18°C</div>
          </div>
        </div>
      `,
      impact: { carbon: 1.5, water: 5, energy: 15 }
    },
  {
    title: "Passage au Sud de l'Afrique",
    position: { x: 10, y: -8.5, z: -4 },
    content: `
        <div class="info-stage">Étape 2: Passage Sud Atlantique</div>
        <img src="images/etape2.jpg" alt="Passage Sud Afrique">
        <div class="info-description">
          <p>Le cargo longe la côte ouest africaine jusqu'au Cap de Bonne-Espérance, contournant l'Afrique pour rejoindre l'océan Indien.</p>
          <div class="info-stats">
            <div class="stat"><i class="stat-icon">🚢</i> Distance: ~6 000 km</div>
            <div class="stat"><i class="stat-icon">⏱️</i> Temps: ~15 jours</div>
          </div>
        </div>
      `,
      impact: { carbon: 2.47, water: 5, energy: 16.5 }
    },
  {
    title: "Traversée de l'Océan Indien",
    position: { x: 2, y: 0, z: -5 },
    content: `
        <div class="info-stage">Étape 3: Traversée de l'Océan Indien</div>
        <img src="images/etape3.png" alt="Traversée Océan Indien">
        <div class="info-description">
          <p>Le cargo traverse l'océan Indien en direction de l'Asie du Sud-Est, en maintenant la chaîne du froid.</p>
          <div class="info-stats">
            <div class="stat"><i class="stat-icon">🚢</i> Distance: ~4 000 km</div>
            <div class="stat"><i class="stat-icon">⏱️</i> Temps: ~10 jours</div>
          </div>
        </div>
      `,
      impact: { carbon: 3.12, water: 5, energy: 17.5 }
    },
  {
    title: "Transformation au Vietnam",
    position: { x: -1.25, y: 1, z: -5 },
    content: `
        <div class="info-stage">Étape 4: Transformation au Vietnam</div>
        <img src="images/transformation.webp" alt="Usine au Vietnam">
        <div class="info-description">
          <p>Les crevettes sont transformées à Hô Chi Minh-Ville : décorticage manuel, nettoyage, reconditionnement et recongélation.</p>
          <div class="info-stats">
            <div class="stat"><i class="stat-icon">🏭</i> Transport local: ~50 km</div>
            <div class="stat"><i class="stat-icon">⏱️</i> Temps: 3-7 jours</div>
          </div>
        </div>
      `,
      impact: { carbon: 4.62, water: 20, energy: 21.61 }
    },
  {
    title: "Retour Océan Indien",
    position: { x: 2, y: 0.5, z: -5 },
    content: `
        <div class="info-stage">Étape 5: Retour par l'Océan Indien</div>
        <img src="images/etape3.png" alt="Retour Océan Indien">
        <div class="info-description">
          <p>Les crevettes transformées repartent en traversant à nouveau l'océan Indien en direction de la Mer Rouge.</p>
          <div class="info-stats">
            <div class="stat"><i class="stat-icon">🚢</i> Distance: ~4 000 km</div>
            <div class="stat"><i class="stat-icon">⏱️</i> Temps: ~10 jours</div>
          </div>
        </div>
      `,
      impact: { carbon: 5.27, water: 20, energy: 22.61 }
    },
  {
    title: "Passage Bab el-Mandeb",
    position: { x: 4.9, y: 1.5, z: -5 },
    content: `
        <div class="info-stage">Étape 6: Passage Bab el-Mandeb</div>
        <img src="images/etape6.webp" alt="Détroit de Bab el-Mandeb">
        <div class="info-description">
          <p>Le cargo passe par le détroit de Bab el-Mandeb pour entrer en Mer Rouge, reliant l'océan Indien à la Méditerranée.</p>
          <div class="info-stats">
            <div class="stat"><i class="stat-icon">🛳️</i> Passage étroit</div>
            <div class="stat"><i class="stat-icon">⏱️</i> Temps: quelques heures</div>
          </div>
        </div>
      `,
      impact: { carbon: 5.37, water: 20, energy: 22.76 }
    },
  {
    title: "Traversée de la Méditerranée",
    position: { x: 7, y: 5.5, z: -3.9 },
    content: `
        <div class="info-stage">Étape 7: Traversée Méditerranée</div>
        <img src="images/etape7.png" alt="Traversée Méditerranée">
        <div class="info-description">
          <p>Après le canal de Suez, le cargo traverse toute la mer Méditerranée jusqu'à Marseille.</p>
          <div class="info-stats">
            <div class="stat"><i class="stat-icon">🚢</i> Distance: ~3 000 km</div>
            <div class="stat"><i class="stat-icon">⏱️</i> Temps: ~7-10 jours</div>
          </div>
        </div>
      `,
      impact: { carbon: 5.86, water: 20, energy: 23.51 }
    },
  {
    title: "Arrivée en France (Marseille)",
    position: { x: 10, y: 9, z: -1 },
    content: `
        <div class="info-stage">Étape 8: Distribution en France</div>
        <img src="images/port-marseille.jpg" alt="Distribution en France">
        <div class="info-description">
          <p>Arrivée à Marseille. Les crevettes sont déchargées puis transportées par camion réfrigéré vers les entrepôts logistiques et points de vente.</p>
          <div class="info-stats">
            <div class="stat"><i class="stat-icon">🚚</i> Distance terrestre: 700-900 km</div>
            <div class="stat"><i class="stat-icon">⏱️</i> Temps: 1-2 jours</div>
          </div>
        </div>
      `,
      impact: { carbon: 5.98, water: 20, energy: 23.69 }
    }
];  

// Helper functions for creating 3D objects
function createPlanet() {
  // Create geometry
  const geometry = new THREE.SphereGeometry(5, 64, 64);

  // Load real Earth textures
  const textureLoader = new THREE.TextureLoader();

  // Earth texture map
  const texture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg');

  // Earth bump map for terrain
  const bumpMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg');

  // Earth specular map for oceans
  const specularMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg');

  const material = new THREE.MeshPhongMaterial({
    map: texture,
    bumpMap: bumpMap,
    bumpScale: 0.05,
    specularMap: specularMap,
    specular: new THREE.Color('grey'),
    shininess: 10
  });

  // Create the mesh
  planet = new THREE.Mesh(geometry, material);
  scene.add(planet);

  // Add a subtle cloud layer
  const cloudGeometry = new THREE.SphereGeometry(5.1, 64, 64);
  const cloudTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png');
  const cloudMaterial = new THREE.MeshPhongMaterial({
    map: cloudTexture,
    transparent: true,
    opacity: 0.3
  });

  const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
  scene.add(clouds);

  // Animate clouds separately
  function animateClouds() {
    clouds.rotation.y += 0.0005;
    requestAnimationFrame(animateClouds);
  }

  animateClouds();

  // Add atmosphere glow
  const atmosphereGeometry = new THREE.SphereGeometry(5.2, 64, 64);
  const atmosphereMaterial = new THREE.MeshPhongMaterial({
    color: 0x4ca6ff,
    transparent: true,
    opacity: 0.2,
    side: THREE.BackSide
  });
  const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
  scene.add(atmosphere);
}

function createStars() {
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.1
  });

  const starVertices = [];
  for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
  }

  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
}
