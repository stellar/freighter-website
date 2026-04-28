export interface FAQItem {
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    question:
      "How do I generate a new Stellar address and create a Stellar account using Freighter?",
    answer:
      "When you first install Freighter, you'll be guided through creating a new wallet. This generates a unique Stellar address (public key) and a recovery phrase. To activate your Stellar account, you'll need to send a minimum of 1 XLM to your new address. You can find your address by clicking the copy icon in the wallet header.",
  },
  {
    question: "Why do I need a recovery phrase and a password?",
    answer:
      "Your recovery phrase (also called a seed phrase) is a 24-word backup that can restore your wallet on any device. It's the master key to your accounts. Your password is used to encrypt this recovery phrase locally on your device, so even if someone accesses your device, they can't use your wallet without the password. Both serve different but essential security roles.",
  },
  {
    question: "How do I store my recovery phrase safely?",
    answer:
      "Write your recovery phrase on paper and store it in a safe, secure location — ideally multiple copies in different physical locations. Never store it digitally (no screenshots, no cloud storage, no text files). Never share it with anyone. Consider using a fireproof safe or a safety deposit box for long-term storage.",
  },
  {
    question: "What happens if I lose my recovery phrase?",
    answer:
      "If you lose your recovery phrase and can no longer access your wallet (e.g., lost device, forgotten password), your funds will be permanently inaccessible. Freighter is non-custodial, meaning the Stellar Development Foundation does not have access to your keys and cannot help recover them. This is why securely storing your recovery phrase is critical.",
  },
  {
    question: "What applications are compatible with Freighter?",
    answer:
      "Freighter is compatible with any Stellar-based decentralized application (dApp) that supports wallet connections. Popular examples include StellarX, StellarTerm, Lumenswap, and many other DeFi, NFT, and payment applications built on the Stellar network. Developers can integrate Freighter using the @stellar/freighter-api package.",
  },
  {
    question: "How do I recover my account or use Freighter on a new device?",
    answer:
      "Install Freighter on your new device, then select 'Import Wallet' instead of 'Create New Wallet.' Enter your 24-word recovery phrase, set a new password, and your accounts will be restored. All accounts derived from that recovery phrase will be available once imported.",
  },
  {
    question:
      "How can I access my previously generated accounts after importing my recovery phrase?",
    answer:
      "After importing your recovery phrase, Freighter will restore your primary account. To access additional accounts you previously created, go to the account management section and select 'Add a new Stellar address.' Freighter will derive the next account from your recovery phrase in the same sequence as before.",
  },
  {
    question: "What is Stellar Expert's top 50 assets list?",
    answer:
      "Stellar Expert maintains a curated list of the top 50 most popular and trusted assets on the Stellar network. Freighter uses this list to help you quickly add trustlines to well-known tokens. Assets on this list have been verified for legitimacy, making it safer to interact with them.",
  },
  {
    question: "How can I see my wallet address?",
    answer:
      "Open Freighter and look at the top of the wallet interface. You'll see a truncated version of your Stellar address. Click on it or the copy icon next to it to copy the full address to your clipboard. You can then share this address to receive payments.",
  },
  {
    question: "I forgot my password, how can I redefine it?",
    answer:
      "If you forgot your password, you'll need to reset Freighter and re-import your wallet using your recovery phrase. Go to the Freighter login screen, select 'Forgot password' or 'Reset wallet,' then enter your 24-word recovery phrase and set a new password. Without your recovery phrase, a password reset is not possible.",
  },
  {
    question: "What is the allowed slippage?",
    answer:
      "Slippage refers to the difference between the expected price of a swap and the actual execution price. In Freighter, you can configure the allowed slippage tolerance for DEX swaps. The default is typically set to 1%, meaning your trade will revert if the price moves more than 1% against you during execution.",
  },
  {
    question:
      "How does the address and home domain verification by stellar.expert option work?",
    answer:
      "When enabled, Freighter checks the home domain associated with a Stellar account through Stellar Expert's verification system. This helps you verify that an address belongs to a known entity (like an anchor or exchange) by confirming the domain associated with the account. It adds an extra layer of trust when interacting with unfamiliar addresses.",
  },
];
