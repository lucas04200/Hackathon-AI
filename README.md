# Le Voyage Mondial d'une Crevette

Ce projet est une visualisation interactive en 3D qui montre le parcours mondial d'une crevette, depuis sa pêche au Sénégal jusqu'à son arrivée dans les assiettes en France.

URL du projet : https://hackathon-ai-tau.vercel.app/

## Installation en local

Aucune installation particulière n'est nécessaire, le projet utilise uniquement des fichiers HTML, CSS et JavaScript.

## Comment lancer le projet

1. Assurez-vous que Python est installé sur votre machine  
2. Ouvrez un terminal à la racine du projet  
3. Exécutez la commande suivante pour démarrer un serveur web local :

```bash
python -m http.server 8000
```

4. Ouvrez votre navigateur web et accédez à l'adresse :

```
http://localhost:8000
```

## Structure du projet

- `index.html` - Page principale du site  
- `styles.css` - Styles et mise en page  
- `script.js` - Logique d'animation et interaction  
- `config.js` - Configuration des points d'intérêt du voyage  

## Fonctionnalités

- Visualisation 3D interactive du globe terrestre  
- Animation du parcours d'une crevette entre différentes étapes  
- Informations détaillées sur chaque étape du voyage  
- Affichage de l'impact environnemental à chaque étape  
- Navigation manuelle ou lecture automatique du parcours  

## Compatibilité

Le projet nécessite un navigateur web moderne avec support pour Three.js.
