console.log("Hello world!");

var imageUrl = "img/paper_bg.jpg";
const setBackground = (imageUrl, canvas) => {
  canvas.setBackgroundImage(imageUrl, canvas.renderAll.bind(canvas), {
    backgroundImageOpacity: 0.5,
    backgroundImageStretch: false,
  });
};

const initCanvas = (id) => {
  const container = document.querySelector(".canvas-div"); // Select the parent container (col-10)
  const width = container.offsetWidth * 0.9; // Set canvas width to 80% of parent width
  const height = container.offsetHeight * 0.9; // Calculate height based on a 16:10 ratio

  return new fabric.Canvas(id, {
    width: width, // Set the canvas width
    height: height, // Set the canvas height
    selection: false, // Disable selection (optional)
  });
};

// Met à jour la taille du canvas lors du redimensionnement de la fenêtre
const resizeCanvas = () => {
  const container = document.querySelector(".canvas-div");
  const width = container.offsetWidth * 0.9; // Set canvas width to 80% of parent on resize
  const height = container.offsetHeight * 0.9; // Adjust height based on 16:10 ratio

  canvas.setWidth(width);
  canvas.setHeight(height);
  canvas.renderAll();
};

const toggleMode = (mode) => {
  if (mode === modes.pan) {
    if (currentMode === modes.pan) {
      currentMode = "";
    } else {
      currentMode = modes.pan;
      canvas.isDrawingMode = false;
      canvas.renderAll();
    }
  } else if (mode === modes.drawing) {
    if (currentMode === modes.drawing) {
      currentMode = "";
      canvas.isDrawingMode = false;
      canvas.renderAll();
    } else {
      currentMode = modes.drawing;
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.width = 15;
      canvas.freeDrawingBrush.color = color;
      canvas.renderAll();
    }
  }
};

const setPanEvents = (canvas) => {
  canvas.on("mouse:down", (event) => {
    mousePressed = true;
    if (currentMode === modes.pan) {
      canvas.setCursor("grab");
      canvas.renderAll();
    }
  });

  canvas.on("mouse:up", (event) => {
    mousePressed = false;
    canvas.setCursor("default");
    canvas.renderAll();
  });

  canvas.on("mouse:move", (event) => {
    if (mousePressed && currentMode === modes.pan) {
      const mEvent = event.e;
      const delta = new fabric.Point(mEvent.movementX, mEvent.movementY);

      canvas.setCursor("grab");
      canvas.relativePan(delta);
    }
  });
};

const setColorListener = () => {
  const picker = document.getElementById("colorPicker");
  picker.addEventListener("change", (event) => {
    console.log(event.target.value);
    color = event.target.value;
    canvas.freeDrawingBrush.color = color;
    canvas.renderAll();
  });
};

const clearCanvas = (canvas, state) => {
  state.val = canvas.toSVG();
  canvas.getObjects().forEach((o) => {
    if (o !== canvas.backgroundImage) {
      canvas.remove(o);
    }
  });
};

const createRectangle = (canvas) => {
  console.log("rect");
  const canvasCenter = canvas.getCenter();
  const rect = new fabric.Rect({
    width: 100,
    height: 100,
    fill: color,
    cornerColor: "black",
    stroke: "black", // Set stroke color
    left: canvasCenter.left,
    top: -50,
    originX: "center",
    originY: "center",
    cornerColor: "black",
  });
  canvas.add(rect);

  rect.animate("top", canvasCenter.top, {
    onChange: canvas.renderAll.bind(canvas),
  });
  rect.on("selected", () => {
    rect.set("fill", "#b8295e");
    rect.set("stroke", "#b8295e");
    rect.set("cornerColor", "#b8295e");
    canvas.renderAll();
  });
  rect.on("deselected", () => {
    rect.set("fill", color);
    rect.set("fill", color);
    rect.set("stroke", color);
    rect.set("cornerColor", color);
    canvas.renderAll();
  });
};

const createCircle = (canvas) => {
  const canvasCenter = canvas.getCenter();
  const circle = new fabric.Circle({
    radius: 50,
    fill: color,
    left: canvasCenter.left,
    top: -50,
    originX: "center",
    originY: "center",
    cornerColor: "black",
    stroke: "black", // Set stroke color
  });
  canvas.add(circle);
  canvas.renderAll();
  circle.animate("top", canvas.height - 50, {
    onChange: canvas.renderAll.bind(canvas),
    onComplete: () => {
      circle.animate("top", canvasCenter.top, {
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease.easeOutBounce,
        duration: 200,
      });
    },
  });
  circle.on("selected", () => {
    circle.set("fill", "#b8295e");
    circle.set("stroke", "#b8295e");
    circle.set("cornerColor", "#b8295e");
    canvas.renderAll();
  });
  circle.on("deselected", () => {
    circle.set("fill", color);
    circle.set("fill", color);
    circle.set("stroke", color);
    circle.set("cornerColor", color);
    canvas.renderAll();
  });
};

const groupObjects = (canvas, group, shouldGroup) => {
  if (shouldGroup) {
    const objects = canvas.getObjects();
    group.val = new fabric.Group(objects, { cornerColor: "white" });
    clearCanvas(canvas, svgState);
    canvas.add(group.val);
    canvas.requestRenderAll();
  } else {
    group.val.destroy();
    let oldGroup = group.val.getObjects();
    clearCanvas(canvas, svgState);
    canvas.add(...oldGroup);
    group.val = null;
    canvas.requestRenderAll();
  }
};

const restoreCanvas = (canvas, state, imageUrl) => {
  if (state.val) {
    fabric.loadSVGFromString(state.val, (objects, options) => {
      // Filtrer les objets pour exclure les images de fond
      objects = objects.filter((o) => o["xlink:href"] !== imageUrl);

      // Regrouper les éléments SVG
      const groupedObjects = fabric.util.groupSVGElements(objects, options);

      // Ajouter les éléments regroupés au canvas
      canvas.add(groupedObjects);
      canvas.requestRenderAll();
    });
  }
};

const createSvg = (canvas, modes) => {
  const canvasCenter = canvas.getCenter();
  let svgUrl;

  if (modes === svgModes.couple) {
    svgUrl = "component/couple-planning.svg";
  } else if (modes === svgModes.guest_male) {
    svgUrl = "component/male-guest-planning.svg";
  } else if (modes === svgModes.guest_female) {
    svgUrl = "component/female-guest-planning.svg";
  } else if (modes === svgModes.entertainer) {
    svgUrl = "component/entertainer.svg";
  } else if (modes === svgModes.priest) {
    svgUrl = "component/priest.svg";
  } else if (modes === svgModes.tree) {
    svgUrl = "component/tree.svg";
  } else if (modes === svgModes.chapiteau) {
    svgUrl = "component/tent.svg";
  } else if (modes === svgModes.piano) {
    svgUrl = "component/piano.svg";
  } else if (modes === svgModes.musician) {
    svgUrl = "component/musician.svg";
  } else if (modes === svgModes.toilets) {
    svgUrl = "component/toilets.svg";
  }
  fabric.loadSVGFromURL(svgUrl, (objects, options) => {
    const group = fabric.util.groupSVGElements(objects, options);
    group.set({
      left: canvas.getWidth() / 2,
      top: -50,
      originX: "center",
      originY: "center",
      cornerColor: "black",
      strokeColor: "black",
    });
    group.animate("top", canvasCenter.top, {
      onChange: canvas.renderAll.bind(canvas),
    });

    // Redimensionner le groupe SVG tout en conservant les proportions
    group.scaleToWidth(100);
    group.scaleToHeight(100);

    canvas.add(group);
    canvas.requestRenderAll();
  });
};

const deleteSelectedObject = (canvas) => {
  const activeObject = canvas.getActiveObject();

  if (!activeObject) {
  } else {
    canvas.remove(activeObject);
    canvas.requestRenderAll();
  }
};
const undo = (canvas, stateStack, redoStack) => {
  if (stateStack.length > 0) {
    const currentState = canvas.toJSON(); // Sauvegarde l'état actuel pour "redo"
    redoStack.push(currentState);

    const lastState = stateStack.pop();
    canvas.loadFromJSON(lastState, () => {
      canvas.renderAll();
      console.log("Annulation réussie !");
    });
  } else {
    alert("Aucune action à annuler.");
  }
};

// Fonction redo pour rétablir l'action annulée
const redo = (canvas, redoStack, stateStack) => {
  if (redoStack.length > 0) {
    const currentState = canvas.toJSON(); // Sauvegarde l'état actuel avant redo
    stateStack.push(currentState);

    const nextState = redoStack.pop();
    canvas.loadFromJSON(nextState, () => {
      canvas.renderAll();
      console.log("Rétablissement réussi !");
    });
  } else {
    alert("Aucune action à rétablir.");
  }
};

// Fonction pour capturer l'état et l'ajouter à la pile
const saveState = (canvas, stateStack) => {
  const currentState = canvas.toJSON(); // Capture l'état actuel
  stateStack.push(currentState);
};

// Limitation de la pile (facultatif)
const limitStateStackSize = (stack, limit = 50) => {
  if (stack.length > limit) {
    stack.shift(); // Supprime le plus ancien état si la limite est atteinte
  }
};
const imgAdded = (e) => {
  console.log(e);
  const inputElem = document.getElementById("myImg");
  const file = inputElem.files[0];
  reader.readAsDataURL(file);
};

const reader = new FileReader();
const canvas = initCanvas("canvas");
window.addEventListener("resize", resizeCanvas); // Assure que le canvas est redimensionné avec la fenêtre
let color = "#000000";
const group = {};
const svgState = {};
// Initialisation des piles d'états
const stateStack = [];
const redoStack = [];
let mousePressed = false;
let currentMode = "";
const svgModes = {
  couple: "couple",
  guest_male: "guest_male",
  guest_female: "guest_female",
  entertainer: "entertainer",
  priest: "priest",
  tree: "tree",
  chapiteau: "chapiteau",
  piano: "piano",
  musician: "musician",
  toilets: "toilets",
};
const modes = {
  pan: "pan",
  drawing: "drawing",
};
const inputFile = document.getElementById("myImg");
inputFile.addEventListener("change", imgAdded);
setBackground(imageUrl, canvas);
setPanEvents(canvas);
setColorListener();
reader.addEventListener("load", () => {
  fabric.Image.fromURL(reader.result, (img) => {
    // Set the size of the image relative to the canvas size
    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();

    // Scale down the image if it's too large (e.g., 50% of the canvas size)
    const scaleFactor = 0.5; // Adjust this factor as needed
    img.scaleToWidth(canvasWidth * scaleFactor);
    img.scaleToHeight(canvasHeight * scaleFactor);

    // Set the image's properties
    img.set({
      left: canvasWidth / 2,
      top: canvasHeight / 2,
      originX: "center",
      originY: "center",
      cornerColor: "black",
      stroke: "black", // Set stroke color
      strokeWidth: 5, // Set stroke width, adjust as needed
    });

    // Add the image to the canvas
    canvas.add(img);
    canvas.requestRenderAll();
  });
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Delete") {
    deleteSelectedObject(canvas);
  }
});
// Événements pour capturer l'état du canvas après chaque modification
canvas.on("object:added", () => {
  saveState(canvas, stateStack);
  limitStateStackSize(stateStack); // Limite de la taille de la pile
});

canvas.on("object:removed", () => {
  saveState(canvas, stateStack);
  limitStateStackSize(stateStack);
});

canvas.on("object:modified", () => {
  saveState(canvas, stateStack);
  limitStateStackSize(stateStack);
});

canvas.requestRenderAll();
