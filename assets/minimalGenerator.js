var main = new Splide( '#main-slider', {
  rewind    : true,
  pagination: false,
  arrows    : false,
  focus: 'center'
} );


var thumbnails = new Splide( '#thumbnail-slider', {
  fixedWidth: 70,
  focus: 'center',
  rewind      : true,
  pagination  : false,
  isNavigation: true,
  breakpoints : {
    600: {
      fixedWidth : 70,
    },
  },
} );


thumbnails.sync( main );
main.mount();
thumbnails.mount();

//setup before functions
let typingTimer;                //timer identifier
let doneTypingInterval = 500;  //time in ms, 5 second for example
let $inputName = $('#name');
let $inputLastName = $('#lastName');
let $inputDescription = $('#description');
let used = {false, false, false};

window.onload = function() {
  verticalCard("Your", "Name", "Description");
}

//on keyup, start the countdown
$inputName.on('keyup', function () {
  used[0] = true;
  clearTimeout(typingTimer);
  typingTimer = setTimeout(function() {
    verticalCard($('#name').val(), $('#lastName').val(), $('#description').val());
  }, doneTypingInterval);
});

//on keydown, clear the countdown
$inputName.on('keydown', function () {
  clearTimeout(typingTimer);
});

$inputDescription.on('keyup', function () {
  used[2] = true;
  clearTimeout(typingTimer);
  typingTimer = setTimeout(function() {
    verticalCard($('#name').val(), $('#lastName').val(), $('#description').val());
  }, doneTypingInterval);
});

//on keydown, clear the countdown
$inputDescription.on('keydown', function () {
  clearTimeout(typingTimer);
});

$inputLastName.on('keyup', function () {
  used[1] = true
  clearTimeout(typingTimer);
  typingTimer = setTimeout(function() {
    verticalCard($('#name').val(), $('#lastName').val(), $('#description').val());
  }, doneTypingInterval);
});

//on keydown, clear the countdown
$inputLastName.on('keydown', function () {
  clearTimeout(typingTimer);
});

const center = 1273 / 2

function verticalCard(first, last, desc) {
  let name = first;
  let lastname = last;
  let description = desc;

  let canvas = document.createElement('canvas');
  canvas.width = 1273;
  canvas.height = 2022;
  let ctx = canvas.getContext('2d'),
    background = new Image();
  background.crossOrigin = 'Anonymous';
  background.src = "https://cdn.shopify.com/s/files/1/0417/5590/2119/files/card-design-3-front.png?v=1629630469";

  background.onload = function () {
    ctx.globalAlpha = 1;
    ctx.drawImage(background, 0, 0, 1273, 2022);
    ctx.fillStyle = '#000000'
    ctx.font = "100px 'Poppins', sans-serif"
    name = name.toUpperCase().trim().split("").join(String.fromCharCode(8202))
    lastname = lastname.toUpperCase().trim().split("").join(String.fromCharCode(8202))

    let nameText = ctx.measureText(name)

    let descriptionText = ctx.measureText(lastname)

    if (nameText.width < descriptionText.width) {
      stretchToWidth(name, nameText.width, descriptionText.width > 650 ? 650 : descriptionText.width, 753, ctx)
      ctx.textAlign = "center"
      //ctx.textBaseline = "hanging"
      adjustVerticalFontSize(lastname, ctx)
      ctx.fillText(lastname, center, 911)
    } else {
      stretchToWidth(lastname, descriptionText.width, nameText.width, 911, ctx)
      ctx.textAlign = "center"
      //ctx.textBaseline = "top"
      ctx.fillText(name, center, 753)
    }

    ctx.textBaseline = "alphabetic"
    ctx.font = "italic 500 60px 'Lora', serif"
    description = description.trim().toUpperCase()
    if (ctx.measureText(description).width > 650) {
      const descLetters = description.length
      let firstLine = description.substr(0, descLetters / 2)
      let currentLetter = descLetters / 2
      while (currentLetter < descLetters && description.charAt(currentLetter) !== ' ') {
        firstLine += description.charAt(currentLetter)
        currentLetter += 1
      }
      ctx.fillText(firstLine.trim(), center, 1485)
      ctx.fillText(description.substr(currentLetter + 1, description.length - 1), center, 1552)
    } else {
      ctx.fillText(description.trim().toUpperCase(), center, 1485)
    }

    var img = canvas.toDataURL('image/jpg');
    let slide = $('#frontBig');
    slide.attr('src', img);
    $('#frontThumb').attr('src', img);
  }
}

function stretchToWidth(str, currentWidth, finalWidth, yPosition, ctx) {
  const numberOfLetters = str.length
  const gapWidth = (finalWidth - currentWidth) / (numberOfLetters - 1)
  let distanceGone = center - finalWidth / 2

  for (let i = 0; i < numberOfLetters; i++) {
    ctx.fillText(str.charAt(i), distanceGone, yPosition)
    distanceGone += ctx.measureText(str.charAt(i)).width + gapWidth
  }
}

function adjustVerticalFontSize(str, ctx) {
  let size = ctx.measureText(str).width;
  const desired_width = 650;
  let nameSize = 100;

  while (size > desired_width) {
    nameSize -= 1
    ctx.font = nameSize + "px 'Poppins', sans-serif"
    size = ctx.measureText(str).width
  }
}

WebFont.load({
  google: {
    families: ['Allura', 'Antonio', 'Arimo', 'Cormorant Garamond', 'Playfair Display', 'Poppins', 'Lora']
  }
});
