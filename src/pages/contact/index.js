import React from "react";
import { navigate } from "gatsby-link";
import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("test" + e);
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch((error) => alert(error));
  };

  render() {
    return (
      <Layout>
        <Helmet>
          <meta charSet='utf-8' />
          <link
            href='https://fonts.googleapis.com/css2?family=Cinzel+Decorative&family=Open+Sans&display=swap'
            rel='stylesheet'
          />
        </Helmet>
        <section className='section'>
          <div className='container'>
            <div className='content'>
              <div
                className='full-width-image-container margin-top-1'
                style={{
                  backgroundImage: `url(/img/mail-couverture.jpg)`,
                  backgroundPosition: "left center",
                  marginTop: "-10%",
                  height: "450px",
                }}
              >
                <h2
                  className='title is-size-1 has-text-weight-bold is-bold-light'
                  style={{
                    boxShadow:
                      "0.5rem 0 0 rgb(11, 19, 3, 0.3), -0.5rem 0 0 rgb(11, 19, 3, 0.3)",
                    backgroundColor: "rgb(11, 19, 3, 0.3)",
                    color: "white",
                    padding: "1rem",
                    borderRadius: "15px",
                    fontFamily: "Cinzel Decorative, cursive",
                  }}
                >
                  Contact
                </h2>
              </div>
              <form
                name='contact'
                method='post'
                action='/contact/thanks/'
                data-netlify='true'
                data-netlify-honeypot='bot-field'
                onSubmit={this.handleSubmit}
                style={{
                  fontFamily: "Open Sans",
                  marginTop: "30px",
                }}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type='hidden' name='form-name' value='contact' />
                <div style={{'marginBottom':'25px'}}>
                  <p>
                    Contactez-moi par email : <b>letempsdumieuxetre@gmail.com</b> 
                    <br/>
                    Par téléphone au <b>06 66 85 10 61</b>
                    <br/>
                    <br/>
                    Ou directement via le <b>formulaire de contact</b> ci-dessous :
                  </p>
                </div>
                <div className='field'>
                  <label className='label' htmlFor={"name"}>
                    Nom :
                  </label>
                  <div className='control'>
                    <input
                      className='input'
                      type={"text"}
                      name={"name"}
                      onChange={this.handleChange}
                      id={"name"}
                      required={true}
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label' htmlFor={"email"}>
                    Adresse mail :
                  </label>
                  <div className='control'>
                    <input
                      className='input'
                      type={"email"}
                      name={"email"}
                      onChange={this.handleChange}
                      id={"email"}
                      required={true}
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label' htmlFor={"message"}>
                    Message
                  </label>
                  <div className='control'>
                    <textarea
                      className='textarea'
                      name={"message"}
                      onChange={this.handleChange}
                      id={"message"}
                      required={true}
                    />
                  </div>
                </div>
                <div className='field'>
                  <button className='button' type='submit'>
                    Envoyer
                  </button>
                </div>

              </form>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
