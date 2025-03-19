import React from 'react'

function Services() {
  return (
    <div>
      <h2>Our Services</h2>
      <p>Explore our range of services designed to meet all your financial needs.</p>

      <div className="services-grid">
        <div className="service-card">
          <h4>Personal Banking</h4>
          <p>Checking, savings, credit cards, and more.</p>
        </div>
        <div className="service-card">
          <h4>Business Accounts</h4>
          <p>Tailored solutions for small and large enterprises.</p>
        </div>
        <div className="service-card">
          <h4>Loans & Mortgages</h4>
          <p>Flexible terms for personal or business growth.</p>
        </div>
        <div className="service-card">
          <h4>Investments</h4>
          <p>Advisory and portfolio management to grow your wealth.</p>
        </div>
        <div className="service-card">
          <h4>24/7 Support</h4>
          <p>Get help anytime from our dedicated team.</p>
        </div>
      </div>
    </div>
  )
}

export default Services
