import React from 'react'

function Home() {
  return (
    <div>
      <h2>Welcome to Our Bank</h2>
      <p>
        We provide secure, convenient, and trusted banking services for individuals and businesses.
      </p>

      {/* Example grid layout */}
      <div className="home-grid">
        <div>
          <h3>Personal Accounts</h3>
          <p>Manage your savings, checking, and credit card accounts easily.</p>
        </div>
        <div>
          <h3>Business Solutions</h3>
          <p>Grow your business with our loans, merchant services, and more.</p>
        </div>
      </div>
    </div>
  )
}

export default Home
