import swal from "sweetalert";

export const sendDynamicEmails = async (receiverEmails, subject, body) => {
    try {
      let data = {
        receiver_emails: receiverEmails,
        subject: subject,
        body: body,
      };
  
      const response = await fetch(
        "http://172.17.18.255:8080/exam_sch/api/send-email/",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
  
      console.log(response, "RERSRSR");
  
      if (response.ok || response.status === 200) {
        swal({
          title: "Email sent successfully!!",
          text: "Email Sent",
          icon: "success",
          button: "Close",
        });
      } else {
        const errorData = await response.json();
        console.log(errorData, "ERROR DATA");
  
        swal({
          title: errorData.message || "Error sending email",
          text: errorData?.message,
          icon: "warning",
          button: "Close",
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      swal({
        title: "Error sending email",
        text: error?.message,
        icon: "warning",
        button: "Close",
      });
    }
  };
  