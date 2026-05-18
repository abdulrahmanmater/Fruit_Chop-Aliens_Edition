
"use strict";

class PerformanceMonitor {
    constructor() {
        this.fps = 60;
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.enabled = false;
        this.lowFpsWarned = false;
    }

    update() {
        if (!this.enabled) return;

        this.frameCount++;
        const now = performance.now();

        if (now >= this.lastTime + 1000) {
            this.fps = Math.round(
                (this.frameCount * 1000) / (now - this.lastTime)
            );
            this.frameCount = 0;
            this.lastTime = now;

            const fpsElem = document.getElementById("fpsCounter");
            if (fpsElem) {
                fpsElem.textContent = `FPS: ${this.fps}`;
                fpsElem.style.color =
                    this.fps < 30
                        ? "#ff5252"
                        : this.fps < 45
                            ? "#ffff00"
                            : "#00ff88";
            }

            if (this.fps < 30 && !this.lowFpsWarned) {
                console.warn("⚠️ Low FPS detected:", this.fps);
                this.lowFpsWarned = true;
            } else if (this.fps >= 45) {
                this.lowFpsWarned = false;
            }
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        const elem = document.getElementById("fpsCounter");
        if (elem) elem.style.display = this.enabled ? "block" : "none";
    }
}

const perfMonitor = new PerformanceMonitor();

const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
const isLowEnd = navigator.hardwareConcurrency
    ? navigator.hardwareConcurrency < 4
    : isMobile;
const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

const QUALITY_SETTINGS = {
    high: {
        pixelRatio: 1.5,
        maxEntities: 6,
    },
    medium: {
        pixelRatio: 1.25,
        maxEntities: 5,
    },
    low: {
        pixelRatio: 1,
        maxEntities: 4,
    },
};

const currentQuality = isLowEnd ? "low" : isMobile ? "medium" : "high";
const qualityConfig = QUALITY_SETTINGS[currentQuality];

console.log("🎮 Device Info:", {
    isMobile,
    isLowEnd,
    isTouchDevice,
    quality: currentQuality,
    cores: navigator.hardwareConcurrency || "unknown",
});

const MAPS = [
    {
        name: "الخريطة 1 - عناكب فضائية",
        levels: [
            { target: 1000, maxLives: 3, spawnInterval: 1400, modelPrefix: "spider" },
            { target: 1500, maxLives: 3, spawnInterval: 1300, modelPrefix: "spider" },
            { target: 2000, maxLives: 3, spawnInterval: 1100, modelPrefix: "spider" },
        ],
        story: {
            intro: {
                text: ` I cannot imagine that you will arrive here.
             I will be waiting you, though you will end up dead anyway.`,
                name: "Boss1",
                avatar: "photos/Boss1.png",
                background: "photos/Camp.png",
            },
            bossStart: {
                text: " You managed to get here! Let's see if you can stand against me.",
                name: "Boss1",
                avatar: "photos/Boss1.png",
                background: "photos/Camp.png",
            },
            bossWin: {
                text: "It looks like that I'm about to die. You won't be able to stop the invasion anyway.",
                name: "Boss1",
                avatar: "photos/Boss1.png",
                background: "photos/Camp.png",
            },
            bossLose: {
                text: "Know your place, human.",
                name: "Boss1",
                avatar: "photos/Boss1.png",
                background: "photos/Camp.png",
            },
        },
    },
    {
        name: "الخريطة 2 - روبوتات قتالية",
        levels: [
            { target: 2000, maxLives: 3, spawnInterval: 1100, modelPrefix: "robot" },
            { target: 2500, maxLives: 3, spawnInterval: 1000, modelPrefix: "robot" },
            { target: 3000, maxLives: 3, spawnInterval: 900, modelPrefix: "robot" },
        ],
        story: {
            intro: {
                text: " It looks like that (Boss 1) got killed by a human. Why you did give him a chance? You should have killed him immediately.",
                name: "Boss2",
                avatar: "photos/Boss2.png",
                background: "photos/Camp_Inside.png",
            },
            bossStart: {
                text: " Looks like that you defeated (Boss 1). Since he gave you a chance to defeat him, I won't.",
                name: "Boss2",
                avatar: "photos/Boss2.png",
                background: "photos/Camp_Inside.png",
            },
            bossWin: {
                text: "Didn't imagine that I would get ended by a human. Human, I want to give you an advice before I pass away. Return back to where you came from and surrender. Since (Alien Z) won't spare you for what you did.",
                name: "Boss2",
                avatar: "photos/Boss2.png",
                background: "photos/Camp_Inside.png",
            },
            bossLose: {
                text: "I told you!",
                name: "Boss2",
                avatar: "photos/Boss2.png",
                background: "photos/Camp_Inside.png",
            },
        },
    },
    {
        name: "الخريطة 3 - غزاة من المريخ",
        levels: [
            { target: 3000, maxLives: 3, spawnInterval: 900, modelPrefix: "alien" },
            { target: 3500, maxLives: 3, spawnInterval: 800, modelPrefix: "alien" },
            { target: 4000, maxLives: 3, spawnInterval: 700, modelPrefix: "alien" },
        ],
        story: {
            intro: {
                text: `Both (Boss 1) and (Boss 2) got eliminated,
and that human is on his way to reach here.
I have to prepare, since the guards won't do that much.
`,
                name: "Boss3",
                avatar: "photos/Alien_Blue.png",
                background: "photos/Tower_Top.png",
            },
            bossStart: {
                text: ` Greetings.
I have been watching you from here,
and I got impressed by your fighting talent.
If you were an alien, maybe I would have appointed you to our organization,
but since you are a human, I will take you instead as a test subject.
Anyway, you are here to control of the camp and destroy it, right?
Then if you want to accomplish your job.
You have to face your final trial.
ME!
`,
                name: "Boss3",
                avatar: "photos/Alien_Blue.png",
                background: "photos/Tower_Top.png",
            },
            bossWin: {
                text: `Impossible... A human defeated me.
The invasion... may already be over.
You have earned your victory, warrior.
But do not think this is the end.`,
                name: "Boss3",
                avatar: "photos/Alien_Blue.png",
                background: "photos/Tower_Top.png",
            },
            bossLose: {
                text: `Humans don't have the chance to stand against me,
but you are going to be a good test subject.
Now, keep dreaming.`,
                name: "Boss3",
                avatar: "photos/Alien_Blue.png",
                background: "photos/Tower_Top.png",
            },
        },
    },
];

const CONFIG = {
    gravity: -9.81,
    minThrowForce: 14,
    maxThrowForce: 18,
    slashTrailLength: 6,
    comboTimeout: 1300,
    slashSpeedThreshold: 0.002,
    splitForceMultiplier: 3,
    electricSparkCount: 20,
    gearCount: 2,
    hitboxScale: 1,
    maxSimultaneousEntities: 7,
    difficultyIncreaseInterval: 8000,
    raycastThrottle: 16,
    // Spawn probabilities & timing
    bombSpawnChance: 0.2,
    doubleSpawnChance: 0.3,
    doubleSpawnDelay: 200,
    // Slash detection
    slashYTolerance: 0.15,
    // Difficulty cap
    maxDifficultyLevel: 6,
};

let gameState = {
    playerName: "",
    playerGender: "",
    currentMap: 0,
    currentLevel: 0,
    score: 0,
    combo: 0,
    maxCombo: 0,
    lives: 3,
    targetScore: 100,
    isGameOver: false,
    isPaused: false,
    comboTimer: 0,
    lastSpawnTime: 0,
    modelsLoaded: false,
    difficulty: 1,
    difficultyLevel: 1,
    lastDifficultyIncrease: 0,
    spawnInterval: 1800,
    allModelsPreloaded: false,
    firstEntitySpawned: false,
    levelStartTime: 0,
};

const Storage = {
    set(key, value) {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (e) {
            console.warn("Storage unavailable:", e);
            return false;
        }
    },

    get(key, defaultValue = null) {
        try {
            return localStorage.getItem(key) ?? defaultValue;
        } catch (e) {
            return defaultValue;
        }
    },

    getInt(key, defaultValue = 0) {
        return (
            parseInt(this.get(key, defaultValue.toString())) || defaultValue
        );
    },

    getBool(key, defaultValue = false) {
        return this.get(key, defaultValue.toString()) === "true";
    },
};

function saveHighScore(mapIndex, levelIndex, score) {
    const key = `highscore_${mapIndex}_${levelIndex}`;
    const current = Storage.getInt(key, 0);
    if (score > current) {
        Storage.set(key, score.toString());
    }
}

function getHighScore(mapIndex, levelIndex) {
    return Storage.getInt(`highscore_${mapIndex}_${levelIndex}`, 0);
}

function unlockMap(mapIndex) {
    Storage.set(`map_${mapIndex}_unlocked`, "true");
}

function isMapUnlocked(mapIndex) {
    return (
        mapIndex === 0 || Storage.getBool(`map_${mapIndex}_unlocked`, false)
    );
}

function unlockLevel(mapIndex, levelIndex) {
    Storage.set(`level_${mapIndex}_${levelIndex}_unlocked`, "true");
}

function isLevelUnlocked(mapIndex, levelIndex) {
    return (
        levelIndex === 0 ||
        Storage.getBool(`level_${mapIndex}_${levelIndex}_unlocked`, false)
    );
}

function updateHighScoreDisplay() {
    for (let m = 0; m < MAPS.length; m++) {
        let totalScore = 0;
        for (let l = 0; l < MAPS[m].levels.length; l++) {
            totalScore += getHighScore(m, l);
        }
        const mapElem = document.getElementById(`map${m}Score`);
        if (mapElem) mapElem.textContent = totalScore;
    }

    for (let l = 0; l < MAPS[gameState.currentMap].levels.length; l++) {
        const score = getHighScore(gameState.currentMap, l);
        const elem = document.getElementById(`level${l}Score`);
        if (elem) elem.textContent = score;
    }
}

let selectedGender = "";

function selectGender(gender, btn) {
    selectedGender = gender;
    document.querySelectorAll(".gender-button").forEach((b) => {
        b.classList.remove("selected");
    });
    btn.classList.add("selected");
    checkStartButton();
}

function checkStartButton() {
    const name = document.getElementById("playerNameInput").value.trim();
    const btn = document.getElementById("startGameButton");
    btn.disabled = !(name && selectedGender);
}

document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("playerNameInput");
    if (nameInput) {
        nameInput.addEventListener("input", checkStartButton);
    }
});

function startGameFromSetup() {
    const name =
        document.getElementById("playerNameInput").value.trim() || "لاعب";
    gameState.playerName = name;
    gameState.playerGender = selectedGender;

    document.getElementById("playerSetupScreen").style.display = "none";
    document.getElementById("homeScreen").style.display = "flex";
    updateMapCards();
    updateHighScoreDisplay();
    updatePlayerInfo();
}

function updatePlayerInfo() {
    const genderEmoji = gameState.playerGender === "male" ? "👨" : "👩";
    const test1 = gameState.playerGender === "male" ? "اللاعب" : "اللاعبة";
    document.getElementById(
        "playerInfo"
    ).textContent = `${genderEmoji} ${test1}: ${gameState.playerName}`;
}

// Story data is now embedded in each MAPS entry under the `.story` property.
// (Previously a separate STORY_CONFIG object — merged for maintainability.)

class StoryManager {
    constructor() {
        this.overlay = document.getElementById("storyOverlay");
        this.avatar = document.getElementById("storyAvatar");
        this.name = document.getElementById("storyName");
        this.text = document.getElementById("storyText");
        this.active = false;
    }

    show(storyData, callback) {
        if (!storyData) {
            if (callback) callback();
            return;
        }

        this.active = true;

        this.name.textContent = storyData.name;
        this.text.textContent = storyData.text;
        this.avatar.src = storyData.avatar;
        this.overlay.style.backgroundImage = `url('${storyData.background}')`;

        this.overlay.style.display = "flex";

        const clickHandler = () => {
            this.hide();
            this.overlay.removeEventListener("click", clickHandler);
            if (callback) callback();
        };

        setTimeout(() => {
            this.overlay.addEventListener("click", clickHandler);
        }, 500);
    }

    hide() {
        this.active = false;
        this.overlay.style.display = "none";
        this.avatar.src = "";
        this.name.textContent = "";
        this.text.textContent = "";
    }
}

const storyManager = new StoryManager();

function selectMap(mapIndex) {
    if (!isMapUnlocked(mapIndex)) return;

    storyManager.show(MAPS[mapIndex].story?.intro ?? null, () => {
        gameState.currentMap = mapIndex;
        document.getElementById("homeScreen").style.display = "none";
        document.getElementById("levelScreen").style.display = "flex";
        updateLevelCards();
        updateHighScoreDisplay();
    });
}

function updateLevelCards() {
    // Base labels for level titles (Arabic)
    const levelBaseLabels = ["\u0627\u0644\u0645\u0631\u062d\u0644\u0629 1", "\u0627\u0644\u0645\u0631\u062d\u0644\u0629 2", "\u0627\u0644\u0645\u0631\u062d\u0644\u0629 3"];

    const numLevels = MAPS[gameState.currentMap].levels.length;
    for (let i = 0; i < numLevels; i++) {
        const card = document.getElementById(`level${i}Card`);
        const title = document.getElementById(`level${i}Title`);
        const icon = document.getElementById(`level${i}LockIcon`);

        if (isLevelUnlocked(gameState.currentMap, i)) {
            card.classList.remove("locked");
            card.style.pointerEvents = "";
            if (title) title.textContent = levelBaseLabels[i];
            if (icon) icon.textContent = "";
        } else {
            card.classList.add("locked");
            card.style.pointerEvents = "none";
            if (title) title.textContent = levelBaseLabels[i];
            if (icon) icon.textContent = "\uD83D\uDD12";
        }
    }
}

function updateMapCards() {
    // Base labels for map titles (Arabic + emoji prefix)
    const mapBaseLabels = [
        "\uD83C\uDF0C \u0627\u0644\u062E\u0631\u064A\u0637\u0629 1",
        "\uD83E\uDD16 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 2",
        "\uD83D\uDC7E \u0627\u0644\u062E\u0631\u064A\u0637\u0629 3",
    ];

    for (let i = 0; i < MAPS.length; i++) {
        const card = document.getElementById(`map${i}Card`);
        const title = document.getElementById(`map${i}Title`);
        const icon = document.getElementById(`map${i}LockIcon`);

        if (!card) continue;

        if (isMapUnlocked(i)) {
            card.classList.remove("locked");
            card.style.pointerEvents = "";
            if (title) title.textContent = mapBaseLabels[i];
            if (icon) icon.textContent = "";
        } else {
            card.classList.add("locked");
            card.style.pointerEvents = "none";
            if (title) title.textContent = mapBaseLabels[i];
            if (icon) icon.textContent = "\uD83D\uDD12";
        }
    }
}

function backToHome() {
    document.getElementById("levelScreen").style.display = "none";
    document.getElementById("homeScreen").style.display = "flex";
    updateMapCards();
}

function removeAllGameListeners() {
    console.log("✅ All old listeners removed");
}

function startLevel(levelIndex) {
    if (!isLevelUnlocked(gameState.currentMap, levelIndex)) return;

    cleanup();

    removeAllGameListeners();

    gameState.currentLevel = levelIndex;
    const levelConfig = MAPS[gameState.currentMap].levels[levelIndex];

    gameState.targetScore = levelConfig.target;
    gameState.lives = levelConfig.maxLives;
    gameState.spawnInterval = levelConfig.spawnInterval;
    gameState.score = 0;
    gameState.combo = 0;
    gameState.maxCombo = 0;
    gameState.isGameOver = false;
    gameState.isPaused = true;
    gameState.difficulty = 1;
    gameState.difficultyLevel = 1;
    gameState.levelStartTime = Date.now();
    gameState.lastDifficultyIncrease = Date.now();
    gameState.firstEntitySpawned = false;
    gameState.modelsLoaded = false;
    gameState.lastSpawnTime = Date.now() + 5000;

    // Show correct initial difficulty immediately
    const indicator = document.getElementById("difficultyIndicator");
    if (indicator) indicator.textContent = `⚡ الشدة: 1`;

    document.getElementById("levelScreen").style.display = "none";
    document.getElementById("gameCanvas").style.display = "block";
    document.getElementById("slashTrail").style.display = "block";
    document.getElementById("ui").style.display = "block";
    document.getElementById("loseScreen").style.display = "none";
    document.getElementById("winScreen").style.display = "none";

    updateUI();

    const startLogic = () => {
        if (gameState.allModelsPreloaded) {
            startCountdown();
        }
    };

    if (levelIndex === 2) {
        // Boss Level
        storyManager.show(MAPS[gameState.currentMap].story?.bossStart ?? null, startLogic);
    } else {
        startLogic();
    }
}

function backToMapSelect() {
    cleanup();
    document.getElementById("winScreen").style.display = "none";
    document.getElementById("gameCanvas").style.display = "none";
    document.getElementById("slashTrail").style.display = "none";
    document.getElementById("ui").style.display = "none";
    document.getElementById("countdownScreen").style.display = "none";
    document.getElementById("levelScreen").style.display = "flex";
    updateLevelCards();
    updateHighScoreDisplay();
}

function resetGame() {
    localStorage.clear();

    // Reset all game state
    gameState.playerName = "";
    gameState.playerGender = "";
    gameState.currentMap = 0;
    gameState.currentLevel = 0;
    gameState.score = 0;
    gameState.combo = 0;
    gameState.maxCombo = 0;
    gameState.lives = 3;
    gameState.difficulty = 1;
    gameState.difficultyLevel = 1;
    gameState.isGameOver = false;
    gameState.isPaused = false;

    // Reset the setup form
    const nameInput = document.getElementById("playerNameInput");
    if (nameInput) nameInput.value = "";

    selectedGender = "";
    document.querySelectorAll(".gender-button").forEach((btn) => {
        btn.classList.remove("selected");
    });
    checkStartButton(); // disables start button

    // Navigate: hide home screen → show setup screen
    document.getElementById("homeScreen").style.display = "none";
    document.getElementById("playerSetupScreen").style.display = "flex";

    console.log("✅ Game Reset Successfully - Navigating to Setup Screen");
}

function restartFromBeginning() {
    console.log("🔄 Restarting from beginning...");

    if (gameState.isGameOver === false) {
        cleanup();
    }

    document.getElementById("homeScreen").style.display = "none";
    document.getElementById("playerSetupScreen").style.display = "none";
    document.getElementById("levelScreen").style.display = "none";
    document.getElementById("gameCanvas").style.display = "none";
    document.getElementById("slashTrail").style.display = "none";
    document.getElementById("ui").style.display = "none";
    document.getElementById("initialLoadingScreen").style.display = "none";
    document.getElementById("pauseMenu").style.display = "none";
    document.getElementById("winScreen").style.display = "none";
    document.getElementById("loseScreen").style.display = "none";
    document.getElementById("countdownScreen").style.display = "none";

    gameState.playerName = "";
    gameState.playerGender = "";
    gameState.currentMap = 0;
    gameState.currentLevel = 0;
    gameState.score = 0;
    gameState.combo = 0;
    gameState.maxCombo = 0;
    gameState.lives = 3;
    gameState.isGameOver = false;
    gameState.isPaused = false;

    const nameInput = document.getElementById("playerNameInput");
    if (nameInput) nameInput.value = "";

    selectedGender = "";
    document.querySelectorAll(".gender-button").forEach((btn) => {
        btn.classList.remove("selected");
    });
    checkStartButton();

    showLoadingThenSetup();

    console.log("✅ Restart initiated");
}

function showLoadingThenSetup() {
    document.getElementById("initialLoadingScreen").style.display = "flex";
    document.getElementById("loadingProgress").style.width = "0%";
    document.getElementById("loadingText").textContent = "0%";

    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += 5;
        document.getElementById("loadingProgress").style.width =
            progress + "%";
        document.getElementById("loadingText").textContent = progress + "%";

        if (progress >= 100) {
            clearInterval(loadingInterval);
            document.getElementById("initialLoadingScreen").style.display =
                "none";
            document.getElementById("playerSetupScreen").style.display = "flex";
        }
    }, 40);
}

function quitToMenu() {
    cleanup();

    document.getElementById("pauseMenu").style.display = "none";
    document.getElementById("winScreen").style.display = "none";
    document.getElementById("loseScreen").style.display = "none";
    document.getElementById("gameCanvas").style.display = "none";
    document.getElementById("slashTrail").style.display = "none";
    document.getElementById("ui").style.display = "none";
    document.getElementById("countdownScreen").style.display = "none";
    document.getElementById("homeScreen").style.display = "flex";
    updateMapCards();
    updateHighScoreDisplay();
    updatePlayerInfo();
}

function togglePause() {
    if (gameState.isGameOver) return;
    gameState.isPaused = !gameState.isPaused;
    document.getElementById("pauseMenu").style.display = gameState.isPaused
        ? "block"
        : "none";
    document.getElementById("pauseButton").textContent = gameState.isPaused
        ? "▶ استكمال"
        : "⏸ إيقاف";
}

function nextLevel() {
    document.getElementById("winScreen").style.display = "none";

    if (gameState.currentLevel < 2) {
        unlockLevel(gameState.currentMap, gameState.currentLevel + 1);
        startLevel(gameState.currentLevel + 1);
    } else {
        if (gameState.currentMap < 2) {
            unlockMap(gameState.currentMap + 1);
        }
        quitToMenu();
    }
}

function restartGame() {
    cleanup();
    document.getElementById("pauseMenu").style.display = "none";
    document.getElementById("loseScreen").style.display = "none";
    startLevel(gameState.currentLevel);
}

function cleanup() {
    const playerSetupScreen = document.getElementById("playerSetupScreen");
    const homeScreen = document.getElementById("homeScreen");
    const levelScreen = document.getElementById("levelScreen");

    if (
        playerSetupScreen.style.display !== "none" ||
        homeScreen.style.display !== "none" ||
        levelScreen.style.display !== "none"
    ) {
        console.warn("⚠️ Cleanup blocked: Still in menu screens");
        return;
    }

    removeAllGameListeners();

    gameState.isPaused = true;
    gameState.isGameOver = true;
    gameState.modelsLoaded = false;
    gameState.firstEntitySpawned = false;

    gameState.lastSpawnTime = 0;
    gameState.comboTimer = 0;
    gameState.lastDifficultyIncrease = 0;

    try {
        const slashCanvas = document.getElementById("slashTrail");
        const slashCtx = slashCanvas.getContext("2d");
        slashCtx.clearRect(0, 0, slashCanvas.width, slashCanvas.height);
        slashCanvas.style.display = "none";
    } catch (e) {
        console.warn("Error clearing slash trail:", e);
    }

    slashPath = [];
    isSlashing = false;

    if (entities && Array.isArray(entities)) {
        [...entities].forEach((entity) => {
            if (entity) {
                entityPool.release(entity);
            }
        });
        entities.length = 0;
    }

    if (particles && Array.isArray(particles)) {
        [...particles].forEach((particle) => {
            if (particle) {
                let released = false;

                if (sparkPool && sparkPool.inUse.has(particle)) {
                    sparkPool.release(particle);
                    released = true;
                } else if (gearPool && gearPool.inUse.has(particle)) {
                    gearPool.release(particle);
                    released = true;
                } else if (halvesPool && halvesPool.inUse.has(particle)) {
                    halvesPool.release(particle);
                    released = true;
                }

                if (!released) {
                    if (scene) scene.remove(particle);
                    if (particle.geometry) {
                    }
                }
            }
        });
        particles.length = 0;
    }

    if (scene) {
        const objectsToRemove = [];
        scene.traverse((child) => {
            if (
                child !== scene &&
                !(child instanceof THREE.Light) &&
                !(child instanceof THREE.Camera) &&
                child.visible === true
            ) {
                const isPooled = child.userData && child.userData.pooled;
                if (!isPooled) {
                    objectsToRemove.push(child);
                }
            }
        });

        objectsToRemove.forEach((obj) => {
            scene.remove(obj);
        });
    }

    if (renderer && scene) {
        renderer.clear();
        renderer.clearColor();
    }

    document.getElementById("combo").style.opacity = "0";
    document.getElementById("combo").textContent = "";
    document.getElementById("pauseButton").textContent = "⏸ إيقاف";

    mouse.x = 0;
    mouse.y = 0;
    raycaster.ray.origin.set(0, 0, 0);
    raycaster.ray.direction.set(0, 0, -1);

    console.log("✅ Cleanup completed successfully (Pools preserved)");
}

const canvas = document.getElementById("gameCanvas");
const scene = new THREE.Scene();
// Deep indigo-space background — dark enough to be "space", bright enough to contrast with models
scene.background = new THREE.Color(0x0d0d2b);
scene.fog = new THREE.Fog(0x0d0d2b, 14, 40);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Adapt camera distance & FOV to screen size
function applyCameraSettings() {
    const aspect = window.innerWidth / window.innerHeight;
    const isPortrait = aspect < 1;
    const isNarrow = window.innerWidth < 500;
    camera.fov = isPortrait ? 90 : isNarrow ? 82 : 75;
    const camZ = isPortrait ? 12 : isNarrow ? 11 : 10;
    camera.position.set(0, 2, camZ);
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
}
applyCameraSettings();
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: false,
    alpha: false,
    powerPreference: "high-performance",
});
renderer.setSize(window.innerWidth, window.innerHeight);
// Use lower pixel ratio on mobile for performance
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;


class ShaderPrewarmer {
    constructor(renderer, scene, camera) {
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
        this.prewarmedMaterials = new Set();
        this.prewarmedGeometries = new Set();
    }

    prewarmShader(geometry, material) {
        if (!geometry || !material) return;

        try {
            const key = `${geometry.uuid}-${material.uuid}`;
            if (this.prewarmedMaterials.has(key)) return;

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.z = -10000;

            this.scene.add(mesh);

            this.scene.updateMatrixWorld();

            this.renderer.render(this.scene, this.camera);

            this.scene.remove(mesh);

            this.prewarmedMaterials.add(key);
        } catch (error) {
            console.warn("⚠️ Shader prewarming failed:", error);
        }
    }

    prewarmSparkMaterials() {
        const sparkGeometry = new THREE.SphereGeometry(0.05, 4, 4);
        const sparkMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 1,
        });
        this.prewarmShader(sparkGeometry, sparkMaterial);

        sparkGeometry.dispose();
        sparkMaterial.dispose();
    }

    prewarmGearMaterials() {
        const gearGeometry = new THREE.TorusGeometry(0.3, 0.06, 8, 12);
        const gearMaterial = new THREE.MeshStandardMaterial({
            color: 0x888888,
            metalness: 0.8,
            roughness: 0.3,
        });
        this.prewarmShader(gearGeometry, gearMaterial);

        gearGeometry.dispose();
        gearMaterial.dispose();
    }

    prewarmModelMaterials(model) {
        if (!model) return;

        model.traverse((child) => {
            if (child.isMesh && child.geometry && child.material) {
                const materials = Array.isArray(child.material)
                    ? child.material
                    : [child.material];

                materials.forEach((mat) => {
                    this.prewarmShader(child.geometry, mat);
                });
            }
        });
    }

    async prewarmHalves(types = ["alien", "spider", "robot"]) {
        console.log("🔥 Starting aggressive halves pre-warming & pooling...");

        const halves = [];
        types.forEach((prefix) => {
            for (let num = 1; num <= 3; num++) {
                halves.push({
                    path: `models-compressed/${prefix}${num}back-compressed.glb`,
                    prefix,
                    num,
                    type: "back",
                });
                halves.push({
                    path: `models-compressed/${prefix}${num}forward-compressed.glb`,
                    prefix,
                    num,
                    type: "forward",
                });
            }
        });

        const tempGroup = new THREE.Group();
        tempGroup.position.set(0, 0, -500);
        this.scene.add(tempGroup);

        try {
            const promises = halves.map((item) =>
                loadModel(item.path).then((model) => ({ model, item }))
            );
            const results = await Promise.all(promises);

            results.forEach(({ model }) => {
                if (model) {
                    model.scale.setScalar(1.5);
                    tempGroup.add(model);
                }
            });

            this.scene.updateMatrixWorld();
            this.renderer.render(this.scene, this.camera);

            results.forEach(({ model, item }) => {
                if (model) {
                    tempGroup.remove(model);
                    model.position.set(0, -100, 0);
                    model.visible = false;
                    halvesPool.addModelToPool(
                        model,
                        item.prefix,
                        item.num,
                        item.type
                    );
                }
            });

            console.log("✅ All halves pre-warmed and pooled!");
        } catch (e) {
            console.warn("⚠️ Halves pre-warming failed:", e);
        } finally {
            this.scene.remove(tempGroup);
        }
    }

    getPrewarmedCount() {
        return this.prewarmedMaterials.size;
    }
}

const shaderPrewarmer = new ShaderPrewarmer(renderer, scene, camera);

// ── Lighting Rig ─────────────────────────────────────────────────────────────
// 1. Ambient — lifts shadows so no face is completely black
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

// 2. Key light — main illumination from front-top-right, warm cyan tint
const keyLight = new THREE.DirectionalLight(0x88ddff, 2.0);
keyLight.position.set(6, 12, 8);
scene.add(keyLight);

// 3. Fill light — from opposite side, warm pinkish-purple to add depth
const fillLight = new THREE.DirectionalLight(0xff66cc, 0.8);
fillLight.position.set(-8, 4, 6);
scene.add(fillLight);

// 4. Rim/back light — cold blue-white from behind to outline models against bg
const rimLight = new THREE.DirectionalLight(0x4488ff, 1.0);
rimLight.position.set(0, -4, -10);
scene.add(rimLight);
// ─────────────────────────────────────────────────────────────────────────────

const loader = new THREE.GLTFLoader();

class ModelCacheManager {
    constructor(maxSize = 20) {
        this.cache = new Map();
        this.maxSize = maxSize;
        this.accessOrder = [];
        this.totalSize = 0;
    }

    set(path, model) {
        if (this.cache.has(path)) {
            const oldEntry = this.cache.get(path);
            this.totalSize -= oldEntry.size;
            this.cache.delete(path);
        }

        const size = this.estimateSize(model);
        const entry = {
            model: model,
            size: size,
            lastAccess: Date.now(),
        };

        this.cache.set(path, entry);
        this.totalSize += size;
        this.accessOrder.push(path);

        this.evictIfNeeded();
    }

    get(path) {
        if (!this.cache.has(path)) return null;

        const entry = this.cache.get(path);
        entry.lastAccess = Date.now();

        return entry.model;
    }

    has(path) {
        return this.cache.has(path);
    }

    estimateSize(model) {
        let size = 0;
        model.traverse((child) => {
            if (child.isMesh && child.geometry) {
                const attr = child.geometry.attributes;
                if (attr.position) size += attr.position.array.byteLength;
                if (attr.normal) size += attr.normal.array.byteLength;
                if (attr.uv) size += attr.uv.array.byteLength;
            }
        });
        return size;
    }

    evictIfNeeded() {
        if (this.cache.size > this.maxSize) {
            let oldestPath = this.accessOrder[0];
            let oldestTime = Date.now();

            for (const path of this.accessOrder) {
                const entry = this.cache.get(path);
                if (entry && entry.lastAccess < oldestTime) {
                    oldestPath = path;
                    oldestTime = entry.lastAccess;
                }
            }

            if (oldestPath) {
                const entry = this.cache.get(oldestPath);
                entry.model.traverse((child) => {
                    if (child.isMesh) {
                        if (child.geometry && !child.geometry._isShared) {
                            child.geometry.dispose();
                        }
                        if (child.material) {
                            const mats = Array.isArray(child.material)
                                ? child.material
                                : [child.material];
                            mats.forEach((m) => {
                                if (m && m.map) m.map.dispose();
                                if (m) m.dispose();
                            });
                        }
                    }
                });

                this.totalSize -= entry.size;
                this.cache.delete(oldestPath);
                const index = this.accessOrder.indexOf(oldestPath);
                if (index > -1) this.accessOrder.splice(index, 1);
            }
        }
    }

    clear() {
        this.cache.forEach((entry) => {
            entry.model.traverse((child) => {
                if (child.isMesh) {
                    if (child.geometry) child.geometry.dispose();
                    if (child.material) {
                        const mats = Array.isArray(child.material)
                            ? child.material
                            : [child.material];
                        mats.forEach((m) => {
                            if (m && m.map) m.map.dispose();
                            if (m) m.dispose();
                        });
                    }
                }
            });
        });
        this.cache.clear();
        this.accessOrder = [];
        this.totalSize = 0;
    }
}

const modelCache = new ModelCacheManager(20);

function createOptimizedClone(originalModel) {
    const clone = originalModel.clone();
    const cloneMap = new Map();

    originalModel.traverse((originalChild) => {
        cloneMap.set(originalChild.uuid, originalChild);
    });

    clone.traverse((clonedChild) => {
        const originalChild = cloneMap.get(clonedChild.uuid);
        if (!originalChild) return;

        if (originalChild.isMesh && originalChild.material) {
            if (Array.isArray(originalChild.material)) {
                clonedChild.material = originalChild.material.map((mat) => {
                    const clonedMat = mat.clone();
                    clonedMat._isShared = false;
                    return clonedMat;
                });
            } else {
                const clonedMat = originalChild.material.clone();
                clonedMat._isShared = false;
                clonedChild.material = clonedMat;
            }

            clonedChild.castShadow = false;
            clonedChild.receiveShadow = false;
            clonedChild.frustumCulled = true;
        }
    });

    clone.traverse((child) => {
        if (child.isMesh && child.geometry) {
            child.geometry._isShared = true;
        }
    });

    return clone;
}

function loadModel(path) {
    if (modelCache.has(path)) {
        return Promise.resolve(modelCache.get(path).clone());
    }

    return new Promise((resolve, reject) => {
        loader.load(
            path,
            (gltf) => {
                const model = gltf.scene;
                model.traverse((child) => {
                    if (child.isMesh) {
                        if (child.material) {
                            child.material.flatShading = true;
                            child.material.needsUpdate = true;
                        }
                    }
                });
                modelCache.set(path, model);
                resolve(model.clone());
            },
            undefined,
            (error) => {
                console.error(`Error loading ${path}:`, error);
                reject(error);
            }
        );
    });
}

async function preloadAllModels() {
    const allPaths = [];
    const types = ["alien", "spider", "robot"];
    const parts = ["full", "back", "forward"];

    types.forEach((type) => {
        for (let i = 1; i <= 3; i++) {
            parts.forEach((part) => {
                allPaths.push(
                    `models-compressed/${type}${i}${part}-compressed.glb`
                );
            });
        }
    });
    allPaths.push("models-compressed/gear-compressed.glb");
    allPaths.push("models-compressed/bomb-compressed.glb");

    const startTime = Date.now();
    const targetDuration = 2000;
    let loaded = 0;

    const batchSize = 4;

    const totalSteps = allPaths.length + 9;

    for (let i = 0; i < allPaths.length; i += batchSize) {
        const batch = allPaths.slice(i, i + batchSize);

        const batchPromises = batch.map((path) =>
            loadModel(path).catch((err) => {
                console.warn(`Failed to load ${path}`);
            })
        );

        try {
            const loadedModels = await Promise.all(batchPromises);

            loadedModels.forEach((model) => {
                if (model) {
                    shaderPrewarmer.prewarmModelMaterials(model);
                }
            });
        } catch (error) {
            console.warn("Batch loading error:", error);
        }

        loaded += batch.length;
        updateInitialLoadingProgress(loaded, totalSteps);

        const elapsed = Date.now() - startTime;
        if (elapsed >= targetDuration) {
            for (let j = i + batchSize; j < allPaths.length; j++) {
                loadModel(allPaths[j])
                    .then((model) => {
                        if (model) {
                            shaderPrewarmer.prewarmModelMaterials(model);
                        }
                    })
                    .catch((err) => console.warn(`Failed: ${allPaths[j]}`));
            }
            break;
        }
    }

    const elapsed = Date.now() - startTime;
    if (elapsed < targetDuration) {
        await new Promise((resolve) =>
            setTimeout(resolve, targetDuration - elapsed)
        );
    }

    console.log("🔥 Pre-warming particle shaders...");
    shaderPrewarmer.prewarmSparkMaterials();
    shaderPrewarmer.prewarmGearMaterials();

    loaded += 1;
    updateInitialLoadingProgress(loaded, totalSteps);

    await shaderPrewarmer.prewarmHalves(["alien", "spider", "robot"]);

    loaded += 5;
    updateInitialLoadingProgress(loaded, totalSteps);

    console.log("💣 Pre-filling Entity Pool...");

    for (let i = 0; i < 5; i++) {
        try {
            const bombModel = await loadModel(
                "models-compressed/bomb-compressed.glb"
            );
            if (bombModel) {
                const mesh = bombModel.clone();
                mesh.scale.setScalar(1.5);
                mesh.position.set(0, -100, 0);
                mesh.visible = false;

                const dummyEntity = {
                    modelPrefix: "bomb",
                    modelNumber: 1,
                    mesh: mesh,
                    velocity: new THREE.Vector3(),
                    tempVector: new THREE.Vector3(),
                    angularVelocity: new THREE.Vector3(),
                    isBomb: true,
                    isSliced: false,
                    hitbox: null,
                    points: 0,
                };

                Object.setPrototypeOf(dummyEntity, Entity.prototype);

                const bbox = new THREE.Box3().setFromObject(mesh);
                const size = bbox.getSize(new THREE.Vector3());
                const hitboxGeometry = new THREE.BoxGeometry(
                    size.x,
                    size.y,
                    size.z
                );
                const hitboxMaterial = new THREE.MeshBasicMaterial({
                    visible: false,
                });
                const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
                hitbox.userData.entity = dummyEntity;
                mesh.add(hitbox);
                dummyEntity.hitbox = hitbox;
                mesh.userData.entity = dummyEntity;

                scene.add(mesh);
                entityPool.release(dummyEntity);
            }
        } catch (e) {
            console.warn("Failed to prefill bomb", e);
        }
    }

    const fruitTypes = ["alien", "spider", "robot"];
    for (const prefix of fruitTypes) {
        for (let num = 1; num <= 3; num++) {
            for (let k = 0; k < 2; k++) {
                try {
                    const path = `models-compressed/${prefix}${num}full-compressed.glb`;
                    const model = await loadModel(path);
                    if (model) {
                        const mesh = model.clone();
                        mesh.scale.setScalar(1.5);
                        mesh.position.set(0, -100, 0);
                        mesh.visible = false;

                        const dummyEntity = {
                            modelPrefix: prefix,
                            modelNumber: num,
                            mesh: mesh,
                            velocity: new THREE.Vector3(),
                            tempVector: new THREE.Vector3(),
                            angularVelocity: new THREE.Vector3(),
                            isBomb: false,
                            isSliced: false,
                            hitbox: null,
                            points: 10 + (num - 1) * 5,
                        };

                        Object.setPrototypeOf(dummyEntity, Entity.prototype);

                        const bbox = new THREE.Box3().setFromObject(mesh);
                        const size = bbox.getSize(new THREE.Vector3());
                        const hitboxGeometry = new THREE.BoxGeometry(
                            size.x,
                            size.y,
                            size.z
                        );
                        const hitboxMaterial = new THREE.MeshBasicMaterial({
                            visible: false,
                        });
                        const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
                        hitbox.userData.entity = dummyEntity;
                        mesh.add(hitbox);
                        dummyEntity.hitbox = hitbox;
                        mesh.userData.entity = dummyEntity;

                        scene.add(mesh);
                        entityPool.release(dummyEntity);
                    }
                } catch (e) {
                    console.warn(`Failed to prefill ${prefix}${num}`, e);
                }
            }
        }
    }

    loaded += 2;
    updateInitialLoadingProgress(loaded, totalSteps);

    const gearModel = await loadModel(
        "models-compressed/gear-compressed.glb"
    );
    if (gearModel) {
        gearPool.setBaseModel(gearModel);
        console.log("✅ Gear Pool Initialized");
    }

    loaded += 1;
    updateInitialLoadingProgress(totalSteps, totalSteps);

    console.log(
        `✅ Total prewarmed shaders: ${shaderPrewarmer.getPrewarmedCount()}`
    );

    gameState.allModelsPreloaded = true;
    gameState.modelsLoaded = true;

    setTimeout(() => {
        document.getElementById("initialLoadingScreen").style.display =
            "none";
        document.getElementById("playerSetupScreen").style.display = "flex";
    }, 100);
}

function updateInitialLoadingProgress(loaded, total) {
    const percent = Math.min(100, Math.floor((loaded / total) * 100));
    document.getElementById("loadingProgress").style.width = percent + "%";
    document.getElementById("loadingText").textContent = percent + "%";
}

async function startCountdown() {
    document.getElementById("countdownScreen").style.display = "flex";
    for (let i = 3; i > 0; i--) {
        document.getElementById("countdown").textContent = i;
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    document.getElementById("countdownScreen").style.display = "none";

    gameState.modelsLoaded = true;
    gameState.levelStartTime = Date.now();
    gameState.lastSpawnTime = Date.now() + 500;
    gameState.isPaused = false;
}

class SparkPool {
    constructor(poolSize = 50) {
        this.poolSize = poolSize;
        this.available = [];
        this.inUse = new Set();

        for (let i = 0; i < poolSize; i++) {
            const geometry = new THREE.SphereGeometry(0.05, 4, 4);
            const material = new THREE.MeshBasicMaterial({
                color: 0xff0000,
                transparent: true,
                opacity: 1,
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.userData = { pooled: true, active: false };

            this.available.push(mesh);
        }
    }

    acquire() {
        let spark;

        if (this.available.length > 0) {
            spark = this.available.pop();
            spark.userData.active = true;
        } else {
            const geometry = new THREE.SphereGeometry(0.05, 4, 4);
            const material = new THREE.MeshBasicMaterial({
                color: 0xff0000,
                transparent: true,
                opacity: 1,
            });

            spark = new THREE.Mesh(geometry, material);
            spark.userData = { pooled: true, active: true };
        }

        this.inUse.add(spark);
        return spark;
    }

    release(spark) {
        if (!spark || !this.inUse.has(spark)) return;

        spark.userData.active = false;
        spark.visible = false;
        spark.position.set(0, 0, 0);
        spark.velocity = null;
        spark.life = 0;
        spark.maxLife = 0;

        if (spark.parent) {
            spark.parent.remove(spark);
        }

        this.inUse.delete(spark);
        this.available.push(spark);
    }

    dispose() {
        this.available.forEach((spark) => {
            if (spark.geometry) spark.geometry.dispose();
            if (spark.material) spark.material.dispose();
            spark = null;
        });

        this.inUse.forEach((spark) => {
            if (spark.geometry) spark.geometry.dispose();
            if (spark.material) spark.material.dispose();
            spark = null;
        });

        this.available.length = 0;
        this.inUse.clear();
    }

    getStats() {
        return {
            available: this.available.length,
            inUse: this.inUse.size,
            total: this.poolSize,
        };
    }
}

const sparkPool = new SparkPool(100);

class GearPool {
    constructor(poolSize = 30) {
        this.poolSize = poolSize;
        this.available = [];
        this.inUse = new Set();
        this.baseModel = null;
    }

    setBaseModel(model) {
        this.baseModel = model;
        for (let i = 0; i < this.poolSize; i++) {
            const gear = this.baseModel.clone();
            gear.userData = { pooled: true, active: false };
            gear.visible = false;
            this.available.push(gear);
        }
    }

    acquire() {
        let gear;
        if (this.available.length > 0) {
            gear = this.available.pop();
            gear.userData.active = true;
            gear.visible = true;
        } else if (this.baseModel) {
            gear = this.baseModel.clone();
            gear.userData = { pooled: true, active: true };
            gear.visible = true;
        } else {
            return null;
        }

        this.inUse.add(gear);
        return gear;
    }

    release(gear) {
        if (!gear || !this.inUse.has(gear)) return;

        gear.userData.active = false;
        gear.visible = false;
        gear.position.set(0, -100, 0);

        if (gear.parent) {
            gear.parent.remove(gear);
        }

        this.inUse.delete(gear);
        this.available.push(gear);
    }

    dispose() {
        this.available.forEach((gear) => {
            gear = null;
        });
        this.inUse.forEach((gear) => {
            gear = null;
        });
        this.available.length = 0;
        this.inUse.clear();
        this.baseModel = null;
    }
}

const gearPool = new GearPool(50);

class EntityPool {
    constructor() {
        this.pools = new Map();
        this.inUse = new Set();
    }

    acquire(modelPrefix, modelNumber) {
        const key = `${modelPrefix}_${modelNumber}`;

        if (!this.pools.has(key)) {
            this.pools.set(key, []);
        }

        const pool = this.pools.get(key);
        let entity;

        if (pool.length > 0) {
            entity = pool.pop();
            entity.isSliced = false;
            entity.mesh.visible = true;
            entity.mesh.position.set(0, -10, 0);
            entity.velocity.set(0, 0, 0);
            entity.angularVelocity.set(0, (Math.random() - 0.5) * 3, 0);

            if (entity.hitbox) {
                entity.mesh.add(entity.hitbox);
            }

            scene.add(entity.mesh);

            this.inUse.add(entity);
            return entity;
        }

        return null;
    }

    release(entity) {
        if (
            !entity ||
            !entity.modelPrefix ||
            !entity.modelNumber ||
            !this.inUse.has(entity)
        )
            return;

        const key = `${entity.modelPrefix}_${entity.modelNumber}`;

        entity.isSliced = false;
        if (entity.mesh) {
            entity.mesh.visible = false;
            entity.mesh.position.set(0, -100, 0);

            if (entity.mesh.parent) {
                entity.mesh.parent.remove(entity.mesh);
            }
        }

        this.inUse.delete(entity);

        if (!this.pools.has(key)) {
            this.pools.set(key, []);
        }
        this.pools.get(key).push(entity);
    }

    dispose() {
        this.pools.forEach((pool) => {
            pool.forEach((entity) => { });
        });
        this.pools.clear();
        this.inUse.clear();
    }
}

const entityPool = new EntityPool();

class HalvesPool {
    constructor() {
        this.pools = new Map();
        this.inUse = new Set();
        this.baseModels = new Map();
    }

    registerBaseModel(model, prefix, number, type) {
        const key = `${prefix}${number}_${type}`;
        this.baseModels.set(key, model);
    }

    acquire(modelPrefix, modelNumber, type) {
        const key = `${modelPrefix}${modelNumber}_${type}`;

        if (!this.pools.has(key)) {
            this.pools.set(key, []);
        }

        const pool = this.pools.get(key);
        let half;

        if (pool.length > 0) {
            half = pool.pop();
        } else {
            const base = this.baseModels.get(key);
            if (base) {
                half = base.clone();
            } else {
                console.warn(`⚠️ No base model found for ${key}`);
                return null;
            }
        }

        half.visible = true;
        half.userData.pooled = true;
        half.userData.active = true;
        half.userData.poolKey = key;

        this.inUse.add(half);
        return half;
    }

    release(half) {
        if (!half || !half.userData.poolKey || !this.inUse.has(half)) return;

        const key = half.userData.poolKey;

        half.visible = false;
        half.position.set(0, -100, 0);

        if (half.parent) {
            half.parent.remove(half);
        }

        this.inUse.delete(half);

        if (!this.pools.has(key)) {
            this.pools.set(key, []);
        }
        this.pools.get(key).push(half);
    }

    addModelToPool(model, modelPrefix, modelNumber, type) {
        this.registerBaseModel(model, modelPrefix, modelNumber, type);

        const key = `${modelPrefix}${modelNumber}_${type}`;

        const half = model;
        half.userData.pooled = true;
        half.userData.active = false;
        half.userData.poolKey = key;
        half.visible = false;

        if (!this.pools.has(key)) {
            this.pools.set(key, []);
        }
        this.pools.get(key).push(half);
    }

    dispose() {
        this.pools.forEach((pool) => { });
        this.pools.clear();
        this.inUse.clear();
        this.baseModels.clear();
    }
}

const halvesPool = new HalvesPool();

let entities = [];
let particles = [];

class Entity {
    constructor(modelPrefix, modelNumber) {
        this.modelPrefix = modelPrefix;
        this.modelNumber = modelNumber;
        this.isSliced = false;
        this.isBomb = false;
        this.mesh = null;
        this.velocity = new THREE.Vector3();
        this.tempVector = new THREE.Vector3();
        this.angularVelocity = new THREE.Vector3(
            0,
            (Math.random() - 0.5) * 3,
            0
        );
        this.points = 10 + (modelNumber - 1) * 5;
        this.creationLevelTime = gameState.levelStartTime;

        this.loadAndCreate();
    }

    async loadAndCreate() {
        const currentMapConfig = MAPS[gameState.currentMap];
        const correctPrefix =
            currentMapConfig.levels[gameState.currentLevel].modelPrefix;

        if (
            this.modelPrefix !== correctPrefix &&
            this.modelPrefix !== "bomb"
        ) {
            console.error(
                `❌ Wrong model type! Expected ${correctPrefix}, got ${this.modelPrefix}`
            );
            this.modelPrefix = correctPrefix;
        }
        try {
            if (this.modelPrefix === "bomb") {
                this.isBomb = true;
                const bombModel = await loadModel(
                    "models-compressed/bomb-compressed.glb"
                );
                this.mesh = bombModel;
                this.mesh.scale.setScalar(1.5);
                this.mesh.userData.entity = this;
            } else {
                this.isBomb = false;
                const path = `models-compressed/${this.modelPrefix}${this.modelNumber}full-compressed.glb`;
                this.mesh = await loadModel(path);
                this.mesh.scale.setScalar(1.5);
                this.mesh.userData.entity = this;
            }

            if (
                gameState.isGameOver ||
                this.creationLevelTime !== gameState.levelStartTime
            ) {
                return;
            }

            const bbox = new THREE.Box3().setFromObject(this.mesh);
            const size = bbox.getSize(new THREE.Vector3());
            const hitboxGeometry = new THREE.BoxGeometry(
                size.x * CONFIG.hitboxScale,
                size.y * CONFIG.hitboxScale,
                size.z * CONFIG.hitboxScale
            );
            const hitboxMaterial = new THREE.MeshBasicMaterial({
                visible: false,
            });
            this.hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
            this.hitbox.userData.entity = this;
            this.mesh.add(this.hitbox);

            this.resetPhysics();

            scene.add(this.mesh);
        } catch (error) {
            console.error("Failed to create entity:", error);
            this.remove();
        }
    }

    update(deltaTime) {
        if (this.isSliced || !this.mesh) return;

        this.velocity.y += CONFIG.gravity * deltaTime;

        this.tempVector.copy(this.velocity).multiplyScalar(deltaTime);
        this.mesh.position.add(this.tempVector);

        this.mesh.rotation.y += this.angularVelocity.y * deltaTime;

        if (this.mesh.position.y < -10) {
            this.remove();
            if (!this.isBomb) {
                loseLife();
            }
        }
    }

    slice() {
        if (this.isSliced || !this.mesh) return;
        this.isSliced = true;

        if (this.isBomb) {
            gameLose();
            this.remove();
            return;
        }

        const position = this.mesh.position.clone();
        const currentVelocity = this.velocity.clone();

        addScore(this.points);
        this.createElectricSparks(position);

        if (this.modelPrefix !== "alien") {
            this.createGears(position, currentVelocity);
        }

        this.createHalves(position, currentVelocity);

        this.remove();
    }

    createElectricSparks(position) {
        const bbox = new THREE.Box3().setFromObject(this.mesh);
        const visualCenter = bbox.getCenter(new THREE.Vector3());

        const isRobot = this.modelPrefix === "robot";
        const sparkColor = isRobot ? 0xffffff : 0xff0000;

        for (let i = 0; i < CONFIG.electricSparkCount; i++) {
            const spark = sparkPool.acquire();

            spark.position.copy(visualCenter);
            spark.visible = true;

            if (spark.material) {
                spark.material.color.setHex(sparkColor);
            }

            const velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 15,
                Math.random() * 12,
                0
            );

            spark.userData = {
                velocity: velocity,
                life: 0.5,
                maxLife: 0.5,
                pooled: true,
                active: true,
            };

            scene.add(spark);
            particles.push(spark);
        }
    }

    createGears(position, baseVelocity) {
        for (let i = 0; i < CONFIG.gearCount; i++) {
            const gear = gearPool.acquire();

            if (gear) {
                gear.scale.setScalar(0.002 + Math.random() * 0.001);
                gear.position.copy(position);

                const velocity = baseVelocity.clone();
                velocity.add(
                    new THREE.Vector3(
                        (Math.random() - 0.5) * 8,
                        Math.random() * 6,
                        0
                    )
                );

                gear.userData = {
                    velocity: velocity,
                    angularVelocity: new THREE.Vector3(
                        Math.random() * 10,
                        Math.random() * 10,
                        0
                    ),
                    life: 2.0,
                    pooled: true,
                    active: true,
                };

                scene.add(gear);
                particles.push(gear);
            }
        }
    }

    createHalves(position, baseVelocity) {
        try {
            const leftHalf = halvesPool.acquire(
                this.modelPrefix,
                this.modelNumber,
                "back"
            );
            const rightHalf = halvesPool.acquire(
                this.modelPrefix,
                this.modelNumber,
                "forward"
            );

            if (!leftHalf || !rightHalf) {
                console.warn("⚠️ Missing halves despite dynamic pooling!");
                return;
            }

            leftHalf.scale.setScalar(1.5);
            rightHalf.scale.setScalar(1.5);

            leftHalf.position.copy(position);
            rightHalf.position.copy(position);

            leftHalf.rotation.copy(this.mesh.rotation);
            rightHalf.rotation.copy(this.mesh.rotation);

            const leftVelocity = baseVelocity.clone();
            leftVelocity.x += CONFIG.splitForceMultiplier;
            leftVelocity.y += 2;

            const rightVelocity = baseVelocity.clone();
            rightVelocity.x -= CONFIG.splitForceMultiplier;
            rightVelocity.y += 2;

            leftHalf.userData = {
                velocity: leftVelocity,
                angularVelocity: this.angularVelocity.clone(),
                isHalf: true,
                life: 3.0,
                pooled: true,
                poolKey: `${this.modelPrefix}${this.modelNumber}_back`,
            };

            rightHalf.userData = {
                velocity: rightVelocity,
                angularVelocity: this.angularVelocity.clone(),
                isHalf: true,
                life: 3.0,
                pooled: true,
                poolKey: `${this.modelPrefix}${this.modelNumber}_forward`,
            };

            scene.add(leftHalf);
            scene.add(rightHalf);
            particles.push(leftHalf);
            particles.push(rightHalf);
        } catch (error) {
            console.error("Failed to create halves:", error);
        }
    }

    remove() {
        if (!this.mesh) return;

        try {
            if (this.hitbox) {
                this.mesh.remove(this.hitbox);
            }

            entityPool.release(this);
        } catch (error) {
            console.error("Error removing entity:", error);
        }

        const index = entities.indexOf(this);
        if (index > -1) entities.splice(index, 1);
    }
    resetPhysics() {
        if (!this.mesh) return;

        const side = Math.random() < 0.5 ? -1 : 1;
        // Scale spawn X to visible world width so entities don't spawn off-screen
        const halfW = getSpawnHalfWidth();
        const spawnX = side * (halfW * 0.25 + Math.random() * halfW * 0.65);
        this.mesh.position.set(spawnX, -10, 0);

        const force =
            CONFIG.minThrowForce +
            Math.random() * (CONFIG.maxThrowForce - CONFIG.minThrowForce);
        const angle = 45 + Math.random() * 30;
        const radians = (angle * Math.PI) / 180;

        this.velocity.set(
            -side * Math.cos(radians) * force * 0.7,
            Math.sin(radians) * force,
            0
        );

        this.angularVelocity.set(0, (Math.random() - 0.5) * 3, 0);
    }
}

const slashCanvas = document.getElementById("slashTrail");
const slashCtx = slashCanvas.getContext("2d");
slashCanvas.width = window.innerWidth;
slashCanvas.height = window.innerHeight;

// Returns half the visible world width at z=0 for the current camera
function getSpawnHalfWidth() {
    const fovRad = (camera.fov * Math.PI) / 180;
    const halfH = Math.tan(fovRad / 2) * Math.abs(camera.position.z);
    return halfH * camera.aspect * 0.85;
}

let isSlashing = false;
let slashPath = [];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function startSlash(e) {
    if (gameState.isPaused || gameState.isGameOver) return;
    isSlashing = true;
    slashPath = [];
    updateSlash(e);
}

function updateSlash(e) {
    if (!isSlashing || gameState.isPaused || gameState.isGameOver) return;

    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);

    mouse.x = (x / window.innerWidth) * 2 - 1;
    mouse.y = -(y / window.innerHeight) * 2 + 1;

    slashPath.push({ x, y, time: Date.now() });

    if (slashPath.length > CONFIG.slashTrailLength) {
        slashPath.shift();
    }

    drawSlashTrail();
}

function endSlash() {
    isSlashing = false;
    slashPath = [];
    slashCtx.clearRect(0, 0, slashCanvas.width, slashCanvas.height);
}

function drawSlashTrail() {
    slashCtx.clearRect(0, 0, slashCanvas.width, slashCanvas.height);

    if (slashPath.length < 2) return;

    slashCtx.strokeStyle = "rgba(0, 255, 136, 0.8)";
    slashCtx.lineWidth = 4;
    slashCtx.lineCap = "round";
    slashCtx.lineJoin = "round";
    slashCtx.shadowBlur = 15;
    slashCtx.shadowColor = "#00ff88";

    slashCtx.beginPath();
    slashCtx.moveTo(slashPath[0].x, slashPath[0].y);

    for (let i = 1; i < slashPath.length; i++) {
        slashCtx.lineTo(slashPath[i].x, slashPath[i].y);
    }

    slashCtx.stroke();
}

class RaycastThrottler {
    constructor(throttleMs = 16) {
        this.throttleMs = throttleMs;
        this.lastRaycastTime = 0;
        this.interactionBuffer = new Set();
    }

    shouldRaycast(currentTime) {
        if (currentTime - this.lastRaycastTime >= this.throttleMs) {
            this.lastRaycastTime = currentTime;
            return true;
        }
        return false;
    }

    isEntityProcessed(entity) {
        return this.interactionBuffer.has(entity);
    }

    markEntityProcessed(entity) {
        this.interactionBuffer.add(entity);
        setTimeout(
            () => this.interactionBuffer.delete(entity),
            this.throttleMs
        );
    }

    clear() {
        this.interactionBuffer.clear();
    }
}

const raycastThrottler = new RaycastThrottler(16);

function checkSlash() {
    if (slashPath.length < 3) return;
    if (!isValidSlash()) return;

    raycaster.setFromCamera(mouse, camera);

    const hitboxes = [];
    for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        if (entity && entity.hitbox && !entity.isSliced) {
            hitboxes.push(entity.hitbox);
        }
    }

    if (hitboxes.length === 0) return;

    const intersects = raycaster.intersectObjects(hitboxes, false);

    if (intersects.length > 0) {
        const hitbox = intersects[0].object;
        const entity = hitbox.userData.entity;

        if (entity && !raycastThrottler.isEntityProcessed(entity)) {
            const entityScreenPos = entity.mesh.position.clone();
            entityScreenPos.project(camera);

            const yDifference = Math.abs(entityScreenPos.y - mouse.y);

            if (yDifference < CONFIG.slashYTolerance) {
                raycastThrottler.markEntityProcessed(entity);
                entity.slice();
            }
        }
    }
}
function isValidSlash() {
    if (slashPath.length < 3) return false;

    const recentPoints = slashPath.slice(-3);
    const distance = Math.sqrt(
        Math.pow(recentPoints[2].x - recentPoints[0].x, 2) +
        Math.pow(recentPoints[2].y - recentPoints[0].y, 2)
    );
    const time = recentPoints[2].time - recentPoints[0].time;
    const speed = distance / time;

    return speed > CONFIG.slashSpeedThreshold;
}

canvas.addEventListener("mousedown", startSlash);
canvas.addEventListener("mousemove", updateSlash);
canvas.addEventListener("mouseup", endSlash);
canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    startSlash(e);
});
canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    updateSlash(e);
});
canvas.addEventListener("touchend", (e) => {
    e.preventDefault();
    endSlash();
});

function handleSkip() {
    if (storyManager.active) {
        const overlay = document.getElementById("storyOverlay");
        if (overlay && overlay.style.display !== "none") {
            overlay.click();
            return;
        }
    }
}

window.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
        return;

    switch (e.code) {
        case "Escape":
        case "KeyP":
            togglePause();
            break;
        case "KeyM":
            toggleGlobalMute();
            break;
        case "KeyF":
            perfMonitor.toggle();
            break;
        case "Space":
            handleSkip();
            break;
        case "KeyR":
            if (
                document.getElementById("gameCanvas").style.display === "block" ||
                gameState.isGameOver
            ) {
                restartGame();
            }
            break;
        case "KeyQ":
            if (
                document.getElementById("gameCanvas").style.display === "block" ||
                gameState.isGameOver
            ) {
                quitToMenu();
            }
            break;
    }
});

function spawnEntity() {
    if (gameState.lastSpawnTime === 0) {
        return;
    }
    if (
        !gameState.modelsLoaded ||
        gameState.isPaused ||
        gameState.isGameOver
    )
        return;

    const now = Date.now();
    const elapsedSinceStart = now - gameState.levelStartTime;

    if (!gameState.firstEntitySpawned && elapsedSinceStart < 1000) return;

    if (
        now - gameState.lastSpawnTime <
        gameState.spawnInterval / gameState.difficulty
    )
        return;

    if (entities.length >= CONFIG.maxSimultaneousEntities) return;

    gameState.lastSpawnTime = now;
    gameState.firstEntitySpawned = true;

    const levelConfig =
        MAPS[gameState.currentMap].levels[gameState.currentLevel];
    const modelPrefix = levelConfig.modelPrefix;
    const modelNumber = Math.floor(Math.random() * 3) + 1;

    const spawnPooled = (prefix, num) => {
        let entity = entityPool.acquire(prefix, num);

        if (entity) {
            entity.resetPhysics();
            entities.push(entity);
        } else {
            const newEntity = new Entity(prefix, num);
            entityPool.inUse.add(newEntity);
            entities.push(newEntity);
        }
    };

    const isBomb = Math.random() < CONFIG.bombSpawnChance;

    if (isBomb) {
        spawnPooled("bomb", 1);
    } else {
        spawnPooled(modelPrefix, modelNumber);
    }

    if (
        Math.random() < CONFIG.doubleSpawnChance &&
        entities.length < CONFIG.maxSimultaneousEntities
    ) {
        setTimeout(() => {
            if (
                !gameState.isGameOver &&
                !gameState.isPaused &&
                entities.length < CONFIG.maxSimultaneousEntities
            ) {
                if (Math.random() < CONFIG.bombSpawnChance) {
                    spawnPooled("bomb", 1);
                } else {
                    spawnPooled(modelPrefix, Math.floor(Math.random() * 3) + 1);
                }
            }
        }, CONFIG.doubleSpawnDelay);
    }
}

function updateDifficulty() {
    const now = Date.now();
    if (now - gameState.lastDifficultyIncrease > CONFIG.difficultyIncreaseInterval) {
        gameState.difficulty = Math.min(gameState.difficulty + 0.2, 2.2);
        gameState.difficultyLevel = Math.min(gameState.difficultyLevel + 1, CONFIG.maxDifficultyLevel);
        gameState.lastDifficultyIncrease = now;

        const indicator = document.getElementById("difficultyIndicator");
        if (indicator) {
            indicator.textContent = `⚡ الشدة: ${gameState.difficultyLevel}`;
            // Flash effect on increase
            indicator.classList.remove("difficulty-flash");
            void indicator.offsetWidth; // force reflow to restart animation
            indicator.classList.add("difficulty-flash");
        }
    }
}

function addScore(points) {
    gameState.score += Math.floor(points * gameState.difficulty * 1.5);
    gameState.combo++;
    gameState.comboTimer = CONFIG.comboTimeout;

    if (gameState.combo > gameState.maxCombo) {
        gameState.maxCombo = gameState.combo;
    }

    updateUI();
    checkWinCondition();
}

function loseLife() {
    if (gameState.isPaused || gameState.isGameOver) {
        return;
    }

    gameState.lives--;
    gameState.combo = 0;
    updateUI();

    if (gameState.lives <= 0) {
        gameLose();
    }
}

function checkWinCondition() {
    if (gameState.score >= gameState.targetScore) {
        gameWin();
    }
}



function gameLose() {
    if (gameState.isGameOver) {
        console.warn("⚠️ gameLose already called! Preventing duplicate call");
        return;
    }

    gameState.isGameOver = true;
    cleanup();

    document.getElementById("gameCanvas").style.display = "block";
    document.getElementById("slashTrail").style.display = "none";
    document.getElementById("ui").style.display = "none";
    document.getElementById("pauseMenu").style.display = "none";
    document.getElementById("winScreen").style.display = "none";

    if (gameState.currentLevel === 2) {
        const story = MAPS[gameState.currentMap].story;
        storyManager.show(story ? story.bossLose : null, showLoseMenu);
        return;
    }

    showLoseMenu();
}

function showLoseMenu() {
    document.getElementById("loseScore").textContent = gameState.score;
    document.getElementById("loseTarget").textContent =
        gameState.targetScore;
    document.getElementById("loseScreen").style.display = "block";
}

function gameWin() {
    if (gameState.isGameOver) {
        console.warn("⚠️ gameWin already called! Preventing duplicate call");
        return;
    }

    gameState.isGameOver = true;
    cleanup();

    saveHighScore(
        gameState.currentMap,
        gameState.currentLevel,
        gameState.score
    );

    if (gameState.currentLevel < 2) {
        unlockLevel(gameState.currentMap, gameState.currentLevel + 1);
        showWinMenu();
    } else {
        if (gameState.currentMap < 2) {
            unlockMap(gameState.currentMap + 1);
        }

        const proceedToWin = () => {
            if (gameState.currentLevel === 2) {
                const story = MAPS[gameState.currentMap].story;
                storyManager.show(story ? story.bossWin : null, showWinMenu);
            } else {
                showWinMenu();
            }
        };

        proceedToWin();
    }
}

function showWinMenu() {

    document.getElementById("winPlayerName").textContent =
        gameState.playerName;
    document.getElementById("winScore").textContent = gameState.score;
    document.getElementById("winCombo").textContent = gameState.maxCombo;

    const nextLevelBtn = document.querySelector(
        '#winScreen .menu-button[onclick="nextLevel()"]'
    );
    if (nextLevelBtn) {
        nextLevelBtn.style.display = "inline-block";
    }

    const existingMessage = document.getElementById("rateGameMessage");
    if (existingMessage) {
        existingMessage.remove();
    }

    if (gameState.currentMap === 2 && gameState.currentLevel === 2) {
        if (nextLevelBtn) {
            nextLevelBtn.style.display = "none";
        }

        const message = document.createElement("p");
        message.id = "rateGameMessage";
        message.className = "result-text highlight";
        message.style.cssText =
            "font-size: clamp(22px, 5vw, 32px); margin: 30px 0;";
        message.textContent = "🎊 قيم اللعبة... \nانتظروا الجزء الجديد! 🚀";

        const comboLine = document.querySelector(
            "#winScreen .result-text:last-of-type"
        );
        if (comboLine) {
            comboLine.parentNode.insertBefore(message, comboLine.nextSibling);
        }
    }

    document.getElementById("winScreen").style.display = "block";
}

function updateUI() {
    document.getElementById("score").textContent = gameState.score;
    document.getElementById(
        "targetScore"
    ).textContent = `الهدف: ${gameState.score} / ${gameState.targetScore}`;
    document.getElementById("lives").textContent = "⚡".repeat(
        Math.max(0, gameState.lives)
    );

    const comboElement = document.getElementById("combo");
    if (gameState.combo > 2) {
        comboElement.textContent = `COMBO x${gameState.combo}! 🔥`;
        comboElement.style.opacity = "1";
    } else {
        comboElement.style.opacity = "0";
    }
}

function startGameAfterVideo() {
    console.log("⏳ Loading models...");
    document.getElementById("initialLoadingScreen").style.display = "flex";

    preloadAllModels().catch((err) => {
        console.error("❌ Failed to preload models:", err);
        document.getElementById("homeScreen").style.display = "flex";
        alert("فشل تحميل بعض الموديلات. قد تواجه مشاكل في اللعبة.");
    });
}

window.addEventListener("load", () => {
    startGameAfterVideo();
});

let lastTime = performance.now();

function gameLoop(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    gameState.frameCount++;

    if (
        !gameState.isGameOver &&
        !gameState.isPaused &&
        gameState.modelsLoaded
    ) {
        spawnEntity();
        updateDifficulty();
        if (raycastThrottler.shouldRaycast(currentTime)) {
            checkSlash();
        }

        if (gameState.combo > 0) {
            gameState.comboTimer -= deltaTime * 1000;
            if (gameState.comboTimer <= 0) {
                gameState.combo = 0;
                updateUI();
            }
        }

        for (let i = 0; i < entities.length; i++) {
            entities[i].update(deltaTime);
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            const data = p.userData;

            if (data.velocity) {
                data.velocity.y += CONFIG.gravity * deltaTime;
                p.position.addScaledVector(data.velocity, deltaTime);
            }

            if (data.angularVelocity) {
                p.rotation.x += data.angularVelocity.x * deltaTime;
                p.rotation.y += data.angularVelocity.y * deltaTime;
                p.rotation.z += data.angularVelocity.z * deltaTime;
            }

            if (data.life !== undefined) {
                data.life -= deltaTime;
                if (p.material && p.material.opacity !== undefined) {
                    p.material.opacity = Math.max(
                        0,
                        data.life / (data.maxLife || 1)
                    );
                }
            }

            if (
                p.position.y < -10 ||
                (data.life !== undefined && data.life <= 0)
            ) {
                try {
                    if (data.pooled) {
                        if (gearPool && gearPool.inUse.has(p)) {
                            gearPool.release(p);
                        } else if (sparkPool && sparkPool.inUse.has(p)) {
                            sparkPool.release(p);
                        } else if (
                            halvesPool &&
                            (halvesPool.inUse.has(p) || p.userData.poolKey)
                        ) {
                            halvesPool.release(p);
                        }
                    } else {
                        scene.remove(p);

                        p.traverse((child) => {
                            if (child.isMesh) {
                                if (child.geometry && !child.geometry._isShared) {
                                    child.geometry.dispose();
                                }
                                if (child.material) {
                                    const mats = Array.isArray(child.material)
                                        ? child.material
                                        : [child.material];
                                    mats.forEach((m) => {
                                        if (m && m.map) m.map.dispose();
                                        if (m) m.dispose();
                                    });
                                }
                            }
                        });
                    }
                } catch (e) {
                    console.warn("Error removing particle:", e);
                }

                particles[i] = null;
            }
        }
    }

    let writeIndex = 0;
    for (let i = 0; i < particles.length; i++) {
        if (particles[i] !== null) {
            particles[writeIndex] = particles[i];
            writeIndex++;
        }
    }
    particles.length = writeIndex;

    perfMonitor.update();
    renderer.render(scene, camera);
    requestAnimationFrame(gameLoop);
}

window.addEventListener("resize", () => {
    applyCameraSettings();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    slashCanvas.width = window.innerWidth;
    slashCanvas.height = window.innerHeight;
});

gameLoop(performance.now());
