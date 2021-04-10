// function sendEmail(contactForm) {
//       emailjs.send('service_18bqfwo', 'template_4qmk25p',  {
//         "from_name": contactForm.name.value,
//         "project_request" : contactForm.projectsummary.value,
//         "from_email" :contactForm.emailaddress.value  
//     })

//     .then(
//         function(response) {
//         console.log('SUCCESS!', response);
//      }, function(error) {
//         console.log('FAILED...', error);
// });
// return false;
// }


function sendMail(contactForm) {
  emailjs.send("service_zp9ecdq", "template_4qmk25p", {
      "from_name": contactForm.name.value,
      "from_email": contactForm.emailaddress.value,
      "project_request": contactForm.projectsummary.value
  })
  .then(
      function(response) {
          console.log("SUCCESS", response);
      },
      function(error) {
          console.log("FAILED", error);
      }
  );
  return false;  // To block from loading a new page
}