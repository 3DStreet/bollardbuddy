function getChildEntitiesInfoSTRING(parentEl) {
  const childEls = parentEl.children;
  let childEntitiesInfo = '';

  for (let i = 0; i < childEls.length; i++) {
    const childEl = childEls[i];
    const mixinString = `mixin="${childEl.getAttribute('mixin')}"`;
    const positionString = `position="${childEl.getAttribute('position').x} ${childEl.getAttribute('position').y} ${childEl.getAttribute('position').z}"`;
    const rotationString = `rotation="${childEl.getAttribute('rotation').x} ${childEl.getAttribute('rotation').y} ${childEl.getAttribute('rotation').z}"`;

    childEntitiesInfo += `<a-entity ${mixinString} ${positionString} ${rotationString}></a-entity>\n`;
  }

  return childEntitiesInfo;
}


function placeElement(mixin, position) {
  const newEl = document.createElement('a-entity');
  newEl.setAttribute('mixin', mixin);
  newEl.setAttribute('position', position);
  document.getElementById('parent').append(newEl);
};

// Function to get child entities information as NOT Crushed JSON
function getChildEntitiesInfo(parentEl) {
  const precision = 4;
  const childEls = parentEl.children;
  const childEntitiesInfo = [];

  for (let i = 0; i < childEls.length; i++) {
    const childEl = childEls[i];
    const mixinValue = childEl.getAttribute('mixin') || null;
    const positionValue = childEl.getAttribute('position');
    const rotationValue = childEl.getAttribute('rotation');
    
    const entityInfo = {
      mixin: mixinValue,
      components: {
        position: {
          x: parseFloat(positionValue.x.toFixed(precision)),
          y: parseFloat(positionValue.y.toFixed(precision)),
          z: parseFloat(positionValue.z.toFixed(precision))
        },
        rotation: {
          x: parseFloat(rotationValue.x.toFixed(precision)),
          y: parseFloat(rotationValue.y.toFixed(precision)),
          z: parseFloat(rotationValue.z.toFixed(precision))
        }
      }
    };
    
    // Check if this entity has a measure-line component
    const measureLineData = childEl.getAttribute('measure-line');
    if (measureLineData) {
      entityInfo.components['measure-line'] = {
        start: {
          x: parseFloat(measureLineData.start.x.toFixed(precision)),
          y: parseFloat(measureLineData.start.y.toFixed(precision)),
          z: parseFloat(measureLineData.start.z.toFixed(precision))
        },
        end: {
          x: parseFloat(measureLineData.end.x.toFixed(precision)),
          y: parseFloat(measureLineData.end.y.toFixed(precision)),
          z: parseFloat(measureLineData.end.z.toFixed(precision))
        }
      };
    }
    
    childEntitiesInfo.push(entityInfo);
  }
  console.log(childEntitiesInfo)
  return childEntitiesInfo;
}

// Function to add child entities from JSON
function addChildEntities(parentEl, childEntitiesInfo) {
  const decodedChildEntitiesInfo = JSON.parse(window.JSONCrush.uncrush(decodeURIComponent(childEntitiesInfo)));

  for (let i = 0; i < decodedChildEntitiesInfo.length; i++) {
    const childEntityInfo = decodedChildEntitiesInfo[i];
    const childEl = document.createElement('a-entity');

    if (childEntityInfo.mixin) {
      childEl.setAttribute('mixin', childEntityInfo.mixin);
    }

    childEl.setAttribute('position', childEntityInfo.position);
    childEl.setAttribute('rotation', childEntityInfo.rotation);

    parentEl.appendChild(childEl);
  }
}

// Function to add child entities from JSON
function addChildEntitiesFromDecoded(parentEl, childEntitiesInfo) {
  const decodedChildEntitiesInfo = JSON.parse(window.JSONCrush.uncrush(childEntitiesInfo));

  for (let i = 0; i < decodedChildEntitiesInfo.length; i++) {
    const childEntityInfo = decodedChildEntitiesInfo[i];
    const childEl = document.createElement('a-entity');

    if (childEntityInfo.mixin) {
      childEl.setAttribute('mixin', childEntityInfo.mixin);
    }

    childEl.setAttribute('position', childEntityInfo.position);
    childEl.setAttribute('rotation', childEntityInfo.rotation);

    parentEl.appendChild(childEl);
  }
}
