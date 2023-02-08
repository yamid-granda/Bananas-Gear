interface VerifyCompanyEmailRegisterRequestEmailConfig {
  validationUrl: string
}

export function getVerifyCompanyEmailRegisterRequestEmail({
  validationUrl,
}: VerifyCompanyEmailRegisterRequestEmailConfig) {
  return `<!DOCTYPE html>
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: #f1f1f1;margin: 0 auto !important;padding: 0 !important;height: 100% !important;width: 100% !important;">
    <head style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
      <meta charset="utf-8" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
      <!-- utf-8 works for most cases -->
      <meta name="viewport" content="width=device-width" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
      <!-- Forcing initial-scale shouldn't be necessary -->
      <meta http-equiv="X-UA-Compatible" content="IE=edge" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
      <!-- Use the latest (edge) version of IE rendering engine -->
      <meta name="x-apple-disable-message-reformatting" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
      <!-- Disable auto-scale in iOS 10 Mail entirely -->
      <title style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">Verify Email in GoalFlags</title>
      <!-- The title tag shows in email notifications, like Android 4.4. -->
  
      <!-- CSS Reset : BEGIN -->
      
  
      <!-- CSS Reset : END -->
  
      <!-- Progressive Enhancements : BEGIN -->
      
    </head>
  
    <body width="100%" style="margin: 0 auto !important;padding: 0 !important;mso-line-height-rule: exactly;background-color: #222222;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: #f1f1f1;font-family: Arial, sans-serif;font-weight: 400;font-size: 15px;line-height: 1.8;color: rgba(0, 0, 0, 0.4);height: 100% !important;width: 100% !important;">
      <center style="width: 100%;background-color: #f1f1f1;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
        <div style="display: none;font-size: 1px;max-height: 0px;max-width: 0px;opacity: 0;overflow: hidden;mso-hide: all;font-family: sans-serif;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
          &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        </div>
        <div style="max-width: 600px;margin: 0 auto;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="email-container">
          <!-- BEGIN BODY -->
          <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;">
            <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
              <td valign="middle" class="hero bg_white" style="background: url(https://gf-email-images.s3.amazonaws.com/career-path.jpg);background-size: cover;height: 400px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;position: relative;z-index: 0;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                <div class="overlay" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;position: absolute;top: 0;left: 0;right: 0;bottom: 0;content: '';width: 100%;background: #000000;z-index: -1;"></div>
                <table style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
                  <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <td style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                      <div class="text" style="text-align: center;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: rgba(255, 255, 255, 0.8);padding: 0 4em;">
                        <h2 style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-family: Arial, sans-serif;color: #ffffff;margin-top: 0;font-size: 40px;margin-bottom: 0;line-height: 1.2;font-weight: 900;">
                          Strengthen
                          <br style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          your Team
                        </h2>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- end tr -->
            <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
              <td class="bg_dark email-section" style="text-align: center;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: rgba(0, 0, 0, 0.8);padding: 2.5em;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                <div class="heading-section heading-section-white" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: rgba(255, 255, 255, 0.8);">
                  <h2 style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-family: Arial, sans-serif;color: #ffffff;margin-top: 0;font-size: 24px;line-height: 1;font-weight: 700;padding-bottom: 0;">Welcome To GoalFlags</h2>
                  <p style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    The tool to improve your team's career path.
                    <br style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    Click on following button to verify your email.
                  </p>
                  <p style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <a href="${validationUrl}" class="btn btn-primary" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;text-decoration: none;padding: 8px 20px;display: inline-block;font-size: 18px;border-radius: 7px;background: #00897b;color: #ffffff;text-transform: uppercase;font-weight: 600;">Verify My Email Address</a>
                  </p>
                </div>
              </td>
            </tr>
            <!-- end: tr -->
          </table>
          <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;">
            <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
              <td valign="middle" class="bg_black footer email-section" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: #000000;padding: 2.5em;color: rgba(255, 255, 255, 0.5);mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                <table style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
                  <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <td valign="top" width="60%" style="padding-top: 20px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
                        <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <td style="text-align: left;padding-left: 5px;padding-right: 5px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                            <h3 class="heading" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-family: Arial, sans-serif;color: #ffffff;margin-top: 0;font-size: 20px;">Contact</h3>
                            <p style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                              Elizabeth Álvarez
                              <br style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                              +57 3148927308
                              <br style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                              <em style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">Product Reviewer</em>
                            </p>
                            <p style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                              Yamid Granda
                              <br style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                              +57 3155340563
                              <br style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                              <em style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">Software Developer</em>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="top" width="40%" style="padding-top: 20px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
                        <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <td style="text-align: left;padding-right: 10px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                            <h3 class="heading" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-family: Arial, sans-serif;color: #ffffff;margin-top: 0;font-size: 20px;">Mision</h3>
                            <p style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                              Accelerate human evolution by encouraging
                              innovation.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- end: tr -->
            <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
              <td valign="middle" class="bg_black footer email-section" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: #000000;padding: 2.5em;color: rgba(255, 255, 255, 0.5);mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                <table style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
                  <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <td valign="top" width="33.333%" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
                        <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <td style="text-align: left;padding-right: 10px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                            <p style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">&copy; 2021 GoalFlags. All Rights Reserved</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </center>
    </body>
  </html>`
}
