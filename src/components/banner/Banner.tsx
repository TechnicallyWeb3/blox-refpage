import React, { useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import styles from "./Banner.module.css";

const Banner: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <>

      <nav className={styles.bannerContainer}>
      <div className={styles.marquee}>
        <ul className={styles.marquee__content}>
          <li>LIMITED OFFER | 60% OFF | BLOX PRESALE &nbsp;&nbsp;&nbsp;</li>
          <li>LIMITED OFFER | 60% OFF | BLOX PRESALE &nbsp;&nbsp;&nbsp;</li>
          <li>LIMITED OFFER | 60% OFF | BLOX PRESALE &nbsp;&nbsp;&nbsp;</li>
          <li>LIMITED OFFER | 60% OFF | BLOX PRESALE &nbsp;&nbsp;&nbsp;</li>
          <li>LIMITED OFFER | 60% OFF | BLOX PRESALE &nbsp;&nbsp;&nbsp;</li>
          <li>LIMITED OFFER | 60% OFF | BLOX PRESALE &nbsp;&nbsp;&nbsp;</li>
        </ul>
        <ul aria-hidden="true" className={styles.marquee__content}>
          <li>LIMITED OFFER | 60% OFF | BLOX PRESALE &nbsp;&nbsp;&nbsp;</li>
          <li>LIMITED OFFER | 60% OFF | BLOX PRESALE &nbsp;&nbsp;&nbsp;</li>
          <li>LIMITED OFFER | 60% OFF | BLOX PRESALE &nbsp;&nbsp;&nbsp;</li>
          <li>LIMITED OFFER | 60% OFF | BLOX PRESALE &nbsp;&nbsp;&nbsp;</li>
          <li>LIMITED OFFER | 60% OFF | BLOX PRESALE &nbsp;&nbsp;&nbsp;</li>
          <li>LIMITED OFFER | 60% OFF | BLOX PRESALE &nbsp;&nbsp;&nbsp;</li>
        </ul>
      </div>
        <div className={styles.banner}>
          <div className={styles.leftSection}>BLOX PRESALE</div>
          <div className={styles.middleSection}>
            <button className={styles.earlyAccessButton} onClick={toggleModal}>
              EARLY ACCESS NOW
            </button>
          </div>
          <div className={styles.rightSection}>$200 DISCOUNT</div>

          {/* Mobile View Dropdown */}
          <div className={styles.mobileDropdown}>
            <div className={styles.mobileText} onClick={toggleDropdown}>
              BLOX PRESALE<ChevronDownIcon className={styles.dropdownIcon} />
            </div>
            {isDropdownOpen && (
              <div className={styles.dropdownContent}>
                <button className={styles.earlyAccessButton} onClick={toggleModal}>
                  EARLY ACCESS NOW
                </button>
                <div className={styles.textRight}>$200 DISCOUNT</div>
              </div>
            )}
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <div className={styles.banner1}>LIMITED TIME</div>
                <div className={styles.priceContainer}>
                  <div className={styles.priceStriked}>$299</div>
                  <div className={styles.priceCurrent}>$99.99</div>
                  <div className={styles.priceDescription}>for 1 year</div>
                </div>
                <div className={styles.paragraphContainer}>
                  <p>Join the Blox Solutions Presale!
                    Get 66% off a yearly Blox Pro subscription—limited time only!
                    Enjoy full access to advanced features and view over 1,000 transactions in your history for an entire year.
                  </p>
                </div>
                <div className={styles.accessButtons}>
                  <a
                    href="https://buy.stripe.com/cN2g20gbXfyZdKE3cc"
                    className={styles.accessButton1}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy with Fiat
                  </a>
                  <a
                    href="https://commerce.coinbase.com/checkout/b118d605-66fb-4fdb-8aa8-a501688f30ec"
                    className={styles.accessButton1}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy with Crypto
                  </a>
                </div>
                <button className={styles.accessButton} onClick={toggleModal}>Close</button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Banner;
