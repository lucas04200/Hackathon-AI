// Configuration data for the journey points
const points = [
  {
    title: "Pêche à Dakar (Sénégal)",
    position: { x: -1.5, y: 0, z: 3 },
    content: `
          <div class="info-stage">Étape 1: Pêche et congélation</div>
          <img src="images/crevette-congele.webp" alt="Pêche au Sénégal">
          <div class="info-description">
              <p>La crevette commence son parcours à Dakar, au Sénégal, où elle est pêchée dans les eaux côtières par des chalutiers industriels.</p>
              <div class="info-stats">
                  <div class="stat">
                      <i class="stat-icon">📍</i>
                      <span>Distance: 0 km (origine)</span>
                  </div>
                  <div class="stat">
                      <i class="stat-icon">⏱️</i>
                      <span>Temps: 1-3 jours</span>
                  </div>
                  <div class="stat">
                      <i class="stat-icon">🌡️</i>
                      <span>Température: -18°C (congélation)</span>
                  </div>
              </div>
              <p>Après la pêche, les crevettes sont triées, nettoyées et immédiatement congelées à bord avant d'être transférées dans des containers réfrigérés.</p>
          </div>
      `,
    impact: {
      carbon: 10,
      water: 5,
      energy: 15
    }
  },
  {
    title: "Transport maritime vers le Vietnam",
    position: { x: 0, y: 0, z: 5 },
    content: `
          <div class="info-stage">Étape 2: Transport maritime</div>
          <img src="images/transport-conteneur-dakar-vietnam.webp" alt="Transport maritime">
          <div class="info-description">
              <p>Transport par cargo frigorifique de Dakar vers Hô Chi Minh-Ville à travers l'océan Indien.</p>
              <div class="info-stats">
                  <div class="stat">
                      <i class="stat-icon">🚢</i>
                      <span>Distance: ~13 000 km (via canal de Suez)</span>
                  </div>
                  <div class="stat">
                      <i class="stat-icon">⏱️</i>
                      <span>Temps: 30-35 jours</span>
                  </div>
                  <div class="stat">
                      <i class="stat-icon">🌡️</i>
                      <span>Température: -18°C (maintenue)</span>
                  </div>
              </div>
              <p>Les crevettes voyagent dans des containers réfrigérés, consommant de l'énergie en continu pour maintenir la chaîne du froid. Le navire fait plusieurs escales et traverse le canal de Suez.</p>
          </div>
      `,
    impact: {
      carbon: 40,
      water: 10,
      energy: 45
    }
  },
  {
    title: "Transformation au Vietnam",
    position: { x: 5, y: 0, z: 2 },
    content: `
            <div class="info-stage">Étape 3: Transformation</div>
            <img src="images/transformation.webp" alt="Usine au Vietnam">
            <div class="info-description">
                <p>Les crevettes sont transformées dans des usines vietnamiennes spécialisées dans le traitement des produits de la mer.</p>
                <div class="info-stats">
                    <div class="stat">
                        <i class="stat-icon">🏭</i>
                        <span>Distance: ~50 km en transport local</span>
                    </div>
                    <div class="stat">
                        <i class="stat-icon">⏱️</i>
                        <span>Temps: 3-7 jours</span>
                    </div>
                    <div class="stat">
                        <i class="stat-icon">👥</i>
                        <span>Main d'œuvre: Décorticage manuel</span>
                    </div>
                </div>
                <p>Les crevettes sont décongelées, décortiquées à la main, nettoyées, puis recongelées et emballées pour l'exportation. Cette étape nécessite beaucoup de main d'œuvre, ce qui explique la délocalisation vers des pays à faibles coûts salariaux.</p>
            </div>
        `,
    impact: {
      carbon: 25,
      water: 60,
      energy: 30
    }
  },
  {
    title: "Transport maritime vers la France",
    position: { x: 2, y: 0, z: -5 },
    content: `
            <div class="info-stage">Étape 4: Retour vers l'Europe</div>
            <img src="images/transport-vietnam-france.webp" alt="Transport vers l'Europe">
            <div class="info-description">
                <p>Second trajet maritime pour acheminer les crevettes transformées vers l'Europe.</p>
                <div class="info-stats">
                    <div class="stat">
                        <i class="stat-icon">🚢</i>
                        <span>Distance: ~11 000 km</span>
                    </div>
                    <div class="stat">
                        <i class="stat-icon">⏱️</i>
                        <span>Temps: 25-30 jours</span>
                    </div>
                    <div class="stat">
                        <i class="stat-icon">📦</i>
                        <span>Conditionnement: Containers réfrigérés</span>
                    </div>
                </div>
                <p>Les crevettes transformées et reconditionnées sont chargées sur un autre cargo frigorifique pour le long voyage retour vers l'Europe, via l'océan Indien et la mer Méditerranée.</p>
            </div>
        `,
    impact: {
      carbon: 35,
      water: 10,
      energy: 40
    }
  },
  {
    title: "Distribution en France",
    position: { x: 0, y: 1, z: -4 },
    content: `
            <div class="info-stage">Étape 5: Distribution finale</div>
            <img src="images/plateforme-distribution.webp" alt="Distribution en France">
            <div class="info-description">
                <p>Arrivée en France et distribution vers les points de vente.</p>
                <div class="info-stats">
                    <div class="stat">
                        <i class="stat-icon">🚚</i>
                        <span>Distance: 700-900 km en camion</span>
                    </div>
                    <div class="stat">
                        <i class="stat-icon">⏱️</i>
                        <span>Temps: 1-2 jours</span>
                    </div>
                    <div class="stat">
                        <i class="stat-icon">💰</i>
                        <span>Prix final: ~3-4x le prix d'origine</span>
                    </div>
                </div>
                <p>Les crevettes arrivent au port du Havre ou de Marseille, puis sont transportées par camion frigorifique vers les plateformes logistiques comme Rungis, avant d'être distribuées aux supermarchés et restaurants.</p>
                <p><strong>Bilan total:</strong> Distance cumulée d'environ 25 000 à 27 000 km sur 60 à 75 jours (2 à 2,5 mois)</p>
            </div>
        `,
    impact: {
      carbon: 20,
      water: 5,
      energy: 15
    }
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
