# Lyr - Bot Serveur

**Lyr** est un bot pour des serveurs Discord multifonction développé pour animer, modérer et accompagner les membres d’un serveur communautaire. Pensé avec une touche d’humour, ce bot offre des fonctionnalités variées allant de la modération à la gestion musicale

---

## 🚀 Fonctions principales

### 👋 Accueil & Présence
- Accueille les nouveaux membres avec un message personnalisé dans le salon `#〢💮accueil`.
- Met à jour son activité (statut) selon le nombre de membres du serveur.

### 📜 Commandes Utilisateurs
| Commande | Description |
|----------|-------------|
| `.help` | Affiche une page d'aide avec toutes les commandes disponibles. |
| `.ping` | Répond "Pong", permet de tester si le bot est actif. |
| `.say <texte>` | Répète le message dans un embed. |
| `.avatar [@membre]` | Affiche l'avatar de l'utilisateur mentionné (ou vous-même par défaut). |
| `.info` | Donne une petite description du bot. |
| `.si` | Affiche les informations du serveur. |
| `.totalban` | Affiche le nombre total de bannissements sur le serveur. |
| `.bonk` | Frappe symboliquement un membre. |

### 🛠️ Modération
| Commande | Description |
|----------|-------------|
| `.kick @membre [raison]` | Expulse un membre du serveur. |
| `.ban @membre [raison]` | Bannit un membre. |
| `.bi <ID> <raison>` | Bannit un utilisateur via son ID. |
| `.purge <nombre>` | Supprime un certain nombre de messages (max 25). |

### 🎵 Musique
| Commande | Description |
|----------|-------------|
| `.play <URL>` | Joue une musique à partir d’un lien YouTube. |
| `.skip` | Passe à la musique suivante. |
| `.stop` | Arrête la musique et vide la file. |

⚠️ Ces commandes nécessitent d’être dans un salon vocal.

### ⭐ Starboard
- Les messages ayant des réactions ⭐ sont envoyés dans le salon `#〢💮starboard`.
- Les réactions sont mises à jour en temps réel (ajout/suppression).
- Ne fonctionne pas dans le salon `#〢💮starboard` lui-même.

---

## 🔧 Configuration

### Fichier `config.json` requis :
```json
{
  "prefix": ".",
  "DISCORD_TOKEN": "votre_token_ici"
}
