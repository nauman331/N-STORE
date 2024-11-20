import React from "react";
import "../../assets/stylesheets/footer.scss"
import {Facebook, Instagram, Twitter, Youtube} from "lucide-react"
const footer = () => {
  return (
    <>
    <footer class="footer">
  <div class="container">
    <div class="row">
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Our Services</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Affiliate Program</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Get Help</h4>
        <ul>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Shipping</a></li>
          <li><a href="#">Returns</a></li>
          <li><a href="#">Order Status</a></li>
          <li><a href="#">Payment Options</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Online Shop</h4>
        <ul>
          <li><a href="#">Watch</a></li>
          <li><a href="#">Bag</a></li>
          <li><a href="#">Shoes</a></li>
          <li><a href="#">Dress</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Follow Us</h4>
        <div class="social-links">
          <a href="#"><Facebook /></a>
          <a href="#"><Twitter /></a>
          <a href="#"><Instagram /></a>
          <a href="#"><Youtube /></a>
        </div>
      </div>
    </div>
  </div>
</footer>

    </>
  );
};

export default footer;
