const typedText = document.querySelector(".typed-text");
const cursor = document.querySelector(".cursor");

const textArray = ["React JS Developer", "Web Developer", "Frontend Developer", "Software Developer", "Freelancer"];

let textArrayIndex = 0;
let charIndex = 0;

const erase = () => {
  if (charIndex > 0) {
    cursor.classList.remove('blink');
    typedText.textContent = textArray[textArrayIndex].slice(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    cursor.classList.add('blink');
    textArrayIndex++;
    if (textArrayIndex > textArray.length - 1) {
      textArrayIndex = 0;
    }
    setTimeout(type, 300);
  }
}

const type = () => {
  if (charIndex <= textArray[textArrayIndex].length - 1) {
    cursor.classList.remove('blink');
    typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 80);
  } else {
    cursor.classList.add('blink');
    setTimeout(erase, 1000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  type();
})


$(document).ready(function(){
    var d = new Date();
    $('.copyrightYear').html(d.getFullYear());

    var winHT = $(window).height();
    var winWD = $(window).width();
    var navHt = $("header").outerHeight();
    var marginLeft = (winWD - 1200)/2;
    // var bannerHt = winHT - navHt;
    var bannerHt = winHT;
    isFloorplan = 0;
    isBrochure = 0;

    $('.banner_ht').css('height', bannerHt);
    // console.log(marginLeft);
    
    $('.section-first').css('margin-top', navHt)

    $(".goto-home").on("click", function(){
        $("html,body").animate({
            scrollTop : 0
        }, 1000);
    });

    $(".scroll-next").click(function() {
        var cls = $(this).closest("section").next().offset().top - 50;
        $("html, body").animate({scrollTop: cls}, 1000);
    });
    $( ".enq_click" ).click(function() {
        if ($(".form-container").is(':visible')) {
            $( ".form-container" ).slideUp();
        }
        else{
            $( ".form-container").slideToggle();
        }
    });

    $(".menu-icon-mobile").on("click", function(){
        $(".nav-links").slideToggle();
    });

    if(winWD > 1200){
        $('.banner-content-wrapper').css('margin-left', marginLeft);
    }
    
    if(winWD <= 768){
        $(".nav-links a").on("click", function(){
            $(".menu-icon-mobile").trigger("click");
        })

        $(".mob_enq_click, .frmclose").on("click" , function(){
            isBrochure = 0;
            isFloorplan = 0;
            $(".form-container").toggleClass("show");
        });
    }

    $('.skills-slider').slick({
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1,
        speed: 4000,
        cssEase: 'linear',
        slidesToShow: 6,
        slidesToScroll: 1,
        pauseOnFocus: false, 
        pauseOnHover: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
      });


    var childrenSelector = $(".nav-links a");
    var aChildren = $(".nav-links a"); // find the a children of the list items
    if(winWD <= 700)
        var gap = 55;// $(".header-wrapper").outerHeight(); //Navigation height
    else
        var gap = 100;
    var aArray = []; // create the empty aArray
    for (var i=0; i < childrenSelector.length; i++) {    
        var aChild = aChildren[i];
        if (!$(aChild).hasClass('extLink')) {
            if ($(aChild).attr('rel')) {
                var ahref = $(aChild).attr('rel');
                aArray.push(ahref);
            }
        }
    }
    
    //On Scroll - Add class active to active tab
    $(window).scroll(function(){
        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
        var windowHeight = $(window).height(); // get the height of the window
        var docHeight = $(document).height();
        for(i=0;i<aArray.length;i++){
            var theID = aArray[i];
            var divPos = $("#"+theID).offset().top; // get the offset of the div from the top of page
            var divHeight = $("#"+theID).outerHeight(); // get the height of the div in question
            if (windowPos >= (divPos - gap) && windowPos < ((divPos - gap) + divHeight)) {
                if (!$("a[rel='" + theID + "']").hasClass("active"))
                {
           // ga('set', 'page', '/'+theID);
           // ga('send', 'pageview');
           $("a[rel='" + theID + "']").addClass("active"); 
      }
      } 
      else 
      {
           $("a[rel='" + theID + "']").removeClass("active");
      }
       }	

        //If document has scrolled to the end. Add active class to the last navigation menu
        if(windowPos + windowHeight == docHeight) {
            if (!$(".nav-links a:not(.extLink):last-child").hasClass("active")) {
                var navActiveCurrent = $(".active").attr("rel");
                $("a[rel='" + navActiveCurrent + "']").removeClass("active");
                $(".nav-links a:not(.extLink):last-child").addClass("active");
            }
        }
    });
    
    //On Click
    $('.nav-links a, .banner-buttons a').on("click", function(){
        if(!$(this).hasClass('extLink')) {
            var href = $(this).attr("rel");
            if(winWD <= 700)
                var gap = 45; // $(".header-wrapper").outerHeight(); //Navigation height
            else
                var gap = 96;
            
            $('html,body').animate({
                scrollTop: $("#"+href).offset().top - gap
            }, 1000);
        }
    });

});

$(window).scroll(function(){
    $(".lazy").each(function(){
        if($(this).attr("data-src")){
            (this.tagName == "IMG" || this.tagName == "IFRAME") ? $(this).attr("src", $(this).data("src")) : $(this).css("background-image", "url("+$(this).data("src")+")");
            $(this).removeAttr("data-src");
        }
    });
    var windscroll = $(window).scrollTop();
    if (windscroll >= 50) {
        $("header").addClass("active");
    }
    else{
        $("header").removeClass("active");
    }
});