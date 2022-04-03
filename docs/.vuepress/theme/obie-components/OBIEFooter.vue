<template>
  <div class="footer-wrapper">
    <footer class="page-edit footer">
      <div class="footer-navigation">
        <ul>
          <li>
            <a href="https://www.openbanking.org.uk/about-us/">About Us</a>
          </li>
          <li>
            <a href="https://www.openbanking.org.uk/">Customers</a>
          </li>
          <li>
            <a href="https://www.openbanking.org.uk/providers/">Providers</a>
          </li>
          <li>
            <a href="https://www.openbanking.org.uk/contact-us/">Contact Us</a>
          </li>
          <li>
            <a href="https://www.openbanking.org.uk/terms-conditions/">Terms and Conditions</a>
          </li>
          <li>
            <a href="https://www.openbanking.org.uk/privacy-policy/">Privacy Policy</a>
          </li>
          <li>
            <a href="https://www.openbanking.org.uk/cookie-policy/">Cookies</a>
          </li>
          <li>
            <a href="https://www.openbanking.org.uk/accessibility/">Accessibility</a>
          </li>
          <li>
            <a href="https://www.openbanking.org.uk/open-licence/">Open Licence</a>
          </li>
        </ul>
      </div>
      <div class="footer-info">
        <p>Unless otherwise stated, all specifications, documentation, articles, and downloadable reference applications are subject to the MIT Licence.</p>
        <p>Registered in England. Company Number: 10440081</p>
        <p>Registered office: 2 Thomas More Square, London E1W 1YN United Kingdom</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'OBIEFooter',
};
</script>

<style lang="stylus">
.footer {
  height: 227px;
  background-color: #313436;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: 'Equip', 'equip', sans-serif;
  word-spacing: 0;
  font-weight: 300;
}

.footer-navigation {
  display: flex;
  flex-direction: row;
  color: #6180c3;

  ul {
    padding-left: 0;
  }

  li {
    display: inline;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    border-right: 1px solid #ffffff;
  }

  li:first-child {
    padding-left: 0;
  }

  li:last-child {
    border-right: 0;
    padding-right: 0;
  }
}

.footer-info {
  display: flex;
  flex-direction: column;
  color: #ffffff;
}

$mobileSidebarWidth = $sidebarWidth * 0.82;

@media not all and (max-width: $MQMobileNarrow) and (max-width: $MQMobile) {
  .footer {
    margin-left: $sidebarWidth;
  }
}

@media (max-width: $MQNarrow) {
  .footer {
    margin-left: $mobileSidebarWidth;
  }
}

@media (max-width: $MQMobileNarrow), (max-width: $MQMobile) {
  .footer {
    margin-left: 0;
  }
}

.footer-wrapper {
  background-color: #313436;
}
</style>
