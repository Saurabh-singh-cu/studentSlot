export const SmtpAction = async ({ to }) => {
  try {
    const formattedTo = `<${to}>`;
    let data = {
      receiver_email: to,
    };
    const response = await fetch(
      `http://172.17.18.255:8080/exam_sch/api/password-reset/${formattedTo}/`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    console.log(response, "RERSRSR");
    if (response.ok === true || response.status === 200) {
      swal({
        title: `Email sent successfully!!`,
        text: "Email Sent",
        icon: "success",
        button: "Close",
      });
    } else {
      const errorData = await response.json();
      console.log(errorData, "ERROR DATA")

      swal({
        title: `${errorData.message}`,
        text: error?.message,
        icon: "warning",
        button: "Close",
      });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    swal({
      title: `${errorData.message}`,
      text: error?.message,
      icon: "warning",
      button: "Close",
    });
  }
};
