# Flatmate

Hi!👋 Um unser Projekt zu starten gibt es prinzipiell zwei Möglichkeiten!

## Lokal / Entwicklungsumgebung

1. Repo lokal klonen und in den Ordner wechseln

```bash
git clone https://inf-git.fh-rosenheim.de/studexpojo7915/flatmate.git
cd flatmate/
```

2. In den Backend-Ordner wechseln, Datenbank-Migration ausführen und das Backend starten

```bash
cd backend/
npx prisma migrate dev --name init
npm start
```

3. Zweite Shell öffnen, in den Frontend Ordner wechseln und den Server starten

```bash
cd frontend/
npm run dev
```

4. Geschafft! Auf [localhost:5173](http://localhost:5173) ist nun unsere Anwendung zu finden.

## Via Docker

1. Repo lokal klonen und in den Ordner wechseln

```bash
git clone https://inf-git.fh-rosenheim.de/studexpojo7915/flatmate.git
cd flatmate/
```

2. In den Backend-Ordner wechseln und das Docker-Image builden

```bash
cd backend/
docker build . -t "backend"
```

3. Das gleiche nun für das Frontend

```bash
cd frontend/
docker build . -t "frontend"
```

4. Nun in den Root-Folder des Projektes gehen und den Stack starten. Normalerweise müssen keine Umgebungsvariablen angepasst werden. **Soll jedoch die Integration zu Chat-GPT funktionieren, muss noch ein API-Key von OPENAI in der docker-compose.yaml hinterlegt werden**

```bash
docker-compose up -d
# Wenn neueste Docker-Version:
docker compose up -d
```

5. Done! Das Frontend ist nun auf [localhost:4040](http://localhost:4040) erreichbar.
