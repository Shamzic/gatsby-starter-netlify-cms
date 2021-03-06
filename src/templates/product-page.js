import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import Features from "../components/Features";
import Pricing from "../components/Pricing";

import { Helmet } from "react-helmet";
export const ProductPageTemplate = ({
  image,
  title,
  heading,
  description,
  intro,
  pricing,
}) => (
  <div className='content'>
    <Helmet>
      <meta charSet='utf-8' />
      <link
        href='https://fonts.googleapis.com/css2?family=Cinzel+Decorative&family=Open+Sans&family=Sacramento&display=swap'
        rel='stylesheet'
      />
    </Helmet>
    <div
      className='full-width-image-container margin-top-0'
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundPosition: "center center",
      }}
    >
      <h3
        className='has-text is-size-2'
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
        {title}
      </h3>
    </div>
    <section
      className='section section--gradient'
      style={{
        fontFamily: "Open Sans",
      }}
    >
      <div className='container'>
        <div className='section'>
          <div className='columns'>
            <div className='column is-10 is-offset-1'>
              <h1
                className='has-text'
                style={{
                  marginTop: 0,
                  textAlign: "center",
                  fontFamily: "'Sacramento', cursive",
                  color: "#eaa42a",
                }}
              >
                {heading}
              </h1>
              <p
                style={{
                  textAlign: "justify",
                  fontSize: "15px",
                }}
              >
                {description}
              </p>
              <div className='section box '
                style={{
                  background: '#ed9c74',  /* fallback for old browsers */
                  background: '-webkit-linear-gradient(to left, #F1F2B5, #ed9c74)',  /* Chrome 10-25, Safari 5.1-6 */
                  background: 'linear-gradient(to left, #F1F2B5, #ed9c74)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                }}>
              <h5 style={{
                fontStyle: "italic",
                  marginTop: 0,
                  textAlign: "left",
                }}>Nouveauté : <span style={{color: '#fd3f92'}}>Cartes KDO</span></h5>
                <p>Vous souhaitez offrir <span style={{color: '#fd3f92'}}><b>un moment de bien-être</b></span> à l'un de vos proches pour une occasion ou simplement pour faire plaisir : massage solo relaxant, massage DUO ou massage 4 mains, tout est possible à offrir...</p>
                <p>Les cartes KDO sont valables 1 an.</p>
                <p><span style={{color: '#fd3f92'}}><b>Du 1er au 31 décembre KDO : 50€ le massage d'une heure.</b></span></p>
                <p><Link to="/contact" style={{ color: '#363636'}}><b>Contactez-moi en cliquant ici</b></Link> pour passer commande d'une carte KDO et n'hésitez pas à me demander des conseils pour le choix du massage, celui-ci peut être choisi le jour de la prestation. Le paiement peut se faire par chèque (à envoyer au 15 rue de Tarragone 72000 Le Mans, ou en liquide (le jour de la prestation).</p>
              </div>
              <p>
              Laissez vous tenter par l'Abyhanga, le Shiatsu ou encore le Balinais. Un ensemble de massages traditionnels vous est proposé. Les tarifs sont disponibles ci-dessous.
              </p>
            </div>
          </div>
          <div className='columns'>
            <div className='column is-10 is-offset-1'>
              <Pricing data={pricing.plans} />
              <Pricing data={pricing.planstwo} />
              <Pricing data={pricing.plansthree} />
              <Features gridItems={intro.blurbs} />
            <div style={{fontSize: '12px', textAlign: 'center', fontStyle: 'italic'}}>Mes massages n'ont aucun but thérapeutique et sont dénués de toute connotation sexuelle.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

ProductPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  main: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    image1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    image2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    image3: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
  testimonials: PropTypes.array,
  fullImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  pricing: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    plans: PropTypes.array,
  }),
};

const ProductPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <ProductPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        description={frontmatter.description}
        intro={frontmatter.intro}
        main={frontmatter.main}
        testimonials={frontmatter.testimonials}
        fullImage={frontmatter.full_image}
        pricing={frontmatter.pricing}
      />
    </Layout>
  );
};

ProductPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default ProductPage;

export const productPageQuery = graphql`
  query ProductPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
        main {
          heading
          description
          image1 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 526, quality: 92) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image2 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 526, quality: 92) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image3 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 1075, quality: 72) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        testimonials {
          author
          quote
        }
        full_image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        pricing {
          heading
          description
          plans {
            description
            items
            plan
            price
          }
          planstwo {
            description
            items
            plan
            price
          }
          plansthree {
            description
            items
            plan
            price
          }
        }
      }
    }
  }
`;
