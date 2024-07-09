/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector('#mainNav');
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove('navbar-shrink')
    } else {
      navbarCollapsible.classList.add('navbar-shrink')
    }

  };

  // Shrink the navbar 
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener('scroll', navbarShrink);

  //  Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      rootMargin: '0px 0px -40%',
    });
  };

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll('#navbarResponsive .nav-link')
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener('click', () => {
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });

});

//contact email

function sendMail(event) {
  event.preventDefault();
  var params = {
    from_email: document.getElementById('email').value,
    message: document.getElementById('message').value,
    from_name: document.getElementById('name').value,
    from_phone: document.getElementById('phone').value,
  };
  emailjs
    .send("service_xgnw5je", "template_k154y33", params)
    .then(function (res) {
      alert("문의 메일이 전송되었습니다.")
    });
}

//ver3
// window.onload = function () {
//   document.getElementById('contactForm').addEventListener('submit', function (event) {
//     event.preventDefault();

//     const params = {
//       from_email: document.getElementById('email').value,
//       message: document.getElementById('message').value,
//       from_name: document.getElementById('name').value,
//       from_phone: document.getElementById('phone').value,
//     };

//     emailjs.sendForm("service_xgnw5je", "template_k154y33", params)
//       .then(
//         alert("문의 메일이 전송되었습니다.")
//       )
//   })
// }

//ver1
// document.addEventListener('DOMContentLoaded', function () {
//   const emailForm = document.getElementById('contactForm');

//   emailForm.addEventListener('submit', SendMail);

//   function SendMail(event) {
//     event.preventDefault();
//     var params = {
//       from_email: document.getElementById('email').value,
//       message: document.getElementById('message').value,
//       from_name: document.getElementById('name').value,
//       from_phone: document.getElementById('phone').value,
//     };
//     emailjs
//       .send("service_xgnw5je", "template_k154y33", params)
//       .then(function (res) {
//         alert("문의 메일이 전송되었습니다.")
//       });
//   }
// });

//ver2
// const emailForm = document.getElementById('contactForm');
// const contactContainer = document.getElementById('contactContainer');

// function SendMail(event) {
//   event.preventDefault();
//   var params = {
//     from_email: document.getElementById('from_email').value,
//     message: document.getElementById('message').value,
//     from_name: document.getElementById('from_name').value,
//     from_phone: document.getElementById('from_phone').value,
//   };
//   emailjs
//     .send("service_xgnw5je", "template_k154y33", params)
//     .then(function (res) {
//       contactContainer.querySelector('[rel="step1"]').classList.remove('visible');
//       contactContainer.querySelector('[rel="step2"]').classList.add('visible');
//     });
// }

// emailForm.addEventListener('submit', SendMail);