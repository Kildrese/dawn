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

function downloadBlob(blob, name = 'file.txt') {
  // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
  const blobUrl = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement("a");

  // Set link's href to point to the Blob URL
  link.href = blobUrl;
  link.download = name;

  // Append link to the body
  document.body.appendChild(link);

  // Dispatch click event on the link
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    })
  );

  // Remove link from body
  document.body.removeChild(link);
}

const illustratorButton = document.getElementById('illustrator');

fetch("https://cdn.shopify.com/s/files/1/0417/5590/2119/files/4d7.png")
  .then((res) => res.blob())
  .then((myBlob) => {
    illustratorButton.addEventListener('click', () => {
      downloadBlob(myBlob, 'myfile.zip');
    });
  });

const photoButton = document.getElementById('photoshop');

fetch("https://cdn.shopify.com/s/files/1/0417/5590/2119/files/bumpee_card_template.zip?v=1634120945")
  .then((res) => res.blob())
  .then((myBlob) => {
    photoButton.addEventListener('click', () => {
      downloadBlob(myBlob, 'bumpee_card_template.zip');
    });
  });

const frontInput = document.getElementById("frontInput");
const frontPreview = document.getElementById("frontBig");
const frontMinimal = document.getElementById("frontThumb");
const backInput = document.getElementById("backInput");
const backPreview = document.getElementById("backBig");
const backMinimal = document.getElementById("backThumb");

frontInput.onchange = evt => {
  const [file] = frontInput.files
  if (file) {
    const img = new Image();

    img.src = URL.createObjectURL(file);
    img.onload = function() {
      console.log(this.width + 'x' + this.height);
      if (this.width/this.height > 1.58 && this.width/this.height < 1.59) {
        $('#frontLabel').html("Frontside")
        $('#frontLabel').css('color', '#078080');
      } else {
        $('#frontLabel').html("Frontside: Format does not fit")
        $('#frontLabel').css('color', 'red');
      }

    }
    
    frontPreview.src = img.src;
    frontMinimal.src = img.src;
  }
}

backInput.onchange = evt => {
  const [file] = backInput.files
  if (file) {
    const img = new Image();

    img.src = URL.createObjectURL(file);
    img.onload = function() {
      console.log(this.width + 'x' + this.height);
      if (this.width/this.height > 1.58 && this.width/this.height < 1.59) {
        $('#backLabel').html("Backside")
        $('#backLabel').css('color', '#078080');
      } else {
        $('#backLabel').html("Backside: Format does not fit")
        $('#backLabel').css('color', 'red');
      }

    }
    
    backPreview.src = img.src;
    backMinimal.src = img.src;
    
  }
}

function checkRatio(file) {
  let ratio;
  
  const img = new Image();
  
  img.src = URL.createObjectURL(file);
  img.onload = function() {
    console.log(this.width + 'x' + this.height);
    ratio = this.width/this.height;
    console.log(ratio);
  }
  
  return ratio;//&& ratio < 1.59;
  
}