# Jeu JavaScript
Projet de jeu JavaScript pour l'UE d'introduction au JavaScript Master 1 Informatique Université Côte d'Azur

Auteurs: Matthias Carré & Anthony Vasta

# Gameplays

## Commandes

### Déplacement :
    Joueur 1 = ↑ ← ↓ →
    Joueur 2 = Z Q S D / W A S D
    Joueur 3 = I K J I
    Joueur 4 = T G F H

## Code couleur

### Bloc :
   Vert : Ligne d'arrivée
   Rouge : Retour au point de départ

### Bonus/Malus :
   Cyan : Commandes inversées pour les autres joueurs
   Jaune : Bonus de vitesse
   Violet : Ralenti les autres joueurs
   
# Problèmes & Solutions

## Collision

### Objet mouvant
Lorsque que 2 objets mouvent se rencontre avec un joueur au milieu, le joueur traverse les objets mouvants, idem lorsque le joueur se fait bloquer contre un mur par un de ces objets.

### Décompte
Le fonction permettant de faire le décompte au début de chaque niveau ne fonctionnait pas à cause de la fonction `setInterval` que nous n'avons pas réussi à faire fonctionné, nous avons donc réarrangé le code et utilisé la fonction `setTimout()`.

# Conception
Pour la conception du jeu, nous avons créée 3 classes, Players, Levels et Obstacles qui ont chacune leurs propre fichier.

Nous avons utiliser `export default class "NomClass"` pour permettre l'utilisation de ces dernières dans les autres fichiers.

## Classe Players
la classe Players contient :

- tous les attributs des joueurs

- les méthodes get et set afin de récupérer et définir les attributs des joueurs
- une méthodes :
    - draw() pour afficher les joueurs sur le canvas
    - collidesWith() qui permet de gérer les collisions avec les autres joueurs
    - rollback() qui permet de retourner à la position précédente

## Classe Obstacles
la classe Obstacles contient :
- tous les attributs des Obstacles
- une méthodes :
    - setMove() premettant de définir si un obstacle et mobile ou non
    - draw() qui sert afficher les obstacles sur le canvas
    - collisionPlayer() qui permet de gérer les collisions avec entres les obstacles et les joueurs

## Classe Level
la classe Level contient :
- tous les attributs des Level
- une méthodes draw() qui sert afficher les obstacles sur le canvas

    - tous les attributs des Level
    - une méthodes draw() qui sert afficher les obstacles sur le canvas
