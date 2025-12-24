import './globals.css';
// Footer import kar rahe hain (path dhyan se dekhein)
import Footer from '../components/Footer'; 

export const metadata = {
  title: 'The Disposable Depot',
  description: 'Best disposable products in Jalandhar',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Icons ke liye FontAwesome Link */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </head>
      <body>
        {children}
        
        {/* Footer yahan lagaya */}
        <Footer />
      </body>
    </html>
  );
}
