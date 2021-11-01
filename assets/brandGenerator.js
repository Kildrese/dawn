var main = new Splide( '#main-slider', {
  rewind    : true,
  pagination: false,
  arrows    : false,
  focus: 'center',
  breakpoints: {
    600: {
      fixedHeight: 250,
    },
    400: {
      fixedHeight: 150
    }
  }
} );


var thumbnails = new Splide( '#thumbnail-slider', {
  fixedWidth: 100,
  focus: 'center',
  rewind      : true,
  pagination  : false,
  isNavigation: true,
  breakpoints : {
    600: {
      fixedWidth : 60,
      fixedHeight: 44,
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
let $inputDescription = $('#description');
let used = {false, false};

window.onload = function() {
  colorfulCardGenerator("Your Name", "Description", $("input[type='radio']:checked").val());
}

//on keyup, start the countdown
$inputName.on('change keyup', function () {
  used[0] = true;
  clearTimeout(typingTimer);
  typingTimer = setTimeout(function() {
    colorfulCardGenerator($('#name').val(), $('#description').val(), $("input[type='radio']:checked").val());
  }, doneTypingInterval);
});

//on keydown, clear the countdown
$inputName.on('keydown', function () {
  clearTimeout(typingTimer);
});

$inputDescription.on('change keyup', function () {
  used[1] = true;
  clearTimeout(typingTimer);
  typingTimer = setTimeout(function() {
    colorfulCardGenerator($('#name').val(), $('#description').val(), $("input[type='radio']:checked").val());
  }, doneTypingInterval);
});

//on keydown, clear the countdown
$inputDescription.on('keydown', function () {
  clearTimeout(typingTimer);
});

$( ".single-option-selector" ).change(function() {
  colorfulCardGenerator($('#name').val(), $('#description').val(), $("input[type='radio']:checked").val());
});

$('#template--15084713017511__main-Color-0').click(function () {
  colorfulCardGenerator($('#name').val(), $('#description').val(), $("input[type='radio']:checked").val());
})

$('#template--15084713017511__main-Color-1').click(function () {
  colorfulCardGenerator($('#name').val(), $('#description').val(), $("input[type='radio']:checked").val());
})

function colorfulCardGenerator(title, desc, colour) {
  let name = title.trim()
  if (name === "") {
    name = 'Your Name';
  }
  let description = desc.trim()

  let front;
  let back;

  if (colour === "Black") {
    colour = "#000000";
    front = "https://cdn.shopify.com/s/files/1/0417/5590/2119/files/card-design-1-black_5d44d155-ef29-4f10-9856-a04d63c8eab2.png?v=1635515421";
    back = "https://cdn.shopify.com/s/files/1/0417/5590/2119/files/card-design-1-black-back_a0f33c71-317c-4f64-ad58-7a36f498b851.png?v=1635515422";
  } else {
    colour = "#078080"
    front = "https://cdn.shopify.com/s/files/1/0417/5590/2119/files/card-design-1-frontPlain.png?v=1629320868";
    back = "https://cdn.shopify.com/s/files/1/0417/5590/2119/files/card-design-1-backQR.png?v=1634829107";
  }

  let canvas = document.createElement('canvas');
  canvas.width = 2022
  canvas.height = 1273
  let ctx = canvas.getContext('2d'),
      background = new Image();
  background.crossOrigin = 'Anonymous';
  background.src = front;

  background.onload = function () {
    ctx.globalAlpha = 1;
    ctx.drawImage(background, 0, 0, 2022, 1273);
    ctx.fillStyle = colour;
    ctx.font = "bold 157px 'Lora', serif";

    ctx.textAlign = "left";
    adjustColorfulFontSize(name, ctx);
    ctx.fillText(name, 160, 669);
    ctx.font = "51px 'Poppins', sans-serif";
    ctx.fillText(description, 160, 754);

    var img = canvas.toDataURL('image/jpg');
    let slide = $('#frontBig');
    slide.attr('src', img);
    $('#backBig').attr('src', back);
    $('#frontThumb').attr('src', img);
    $('#backThumb').attr('src', back);
  }
}

function adjustColorfulFontSize(str, ctx) {
  let size = ctx.measureText(str).width;
  const desired_width = 950;
  let nameSize = 157;

  while (size > desired_width) {
    nameSize -= 1
    ctx.font = "bold " + nameSize + "px 'Lora', serif"
    size = ctx.measureText(str).width
  }
}

WebFont.load({
  google: {
    families: ['Allura', 'Antonio', 'Arimo', 'Cormorant Garamond', 'Playfair Display', 'Poppins', 'Lora']
  }
});