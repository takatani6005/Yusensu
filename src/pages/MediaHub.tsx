import React, { useState } from 'react';
import { Container, Row, Col, Tab, Nav, Card, Badge, Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog, faNewspaper, faQuestionCircle, faHandshake, faCalendar, faUser, faTags } from '@fortawesome/free-solid-svg-icons';

// Types
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
}

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface Partner {
  id: number;
  name: string;
  description: string;
  logo: string;
  website: string;
}

// Sample data
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Art of Sushi Making',
    excerpt: 'Discover the precision and skill behind traditional sushi preparation.',
    content: 'Traditional sushi making is an art form that requires years of dedicated practice. From selecting the freshest fish to preparing the perfect sushi rice, every step demands precision and attention to detail. The knife skills alone can take a decade to master. At Yusensu, our master chef brings over 20 years of experience to craft each piece with reverence for tradition while embracing modern techniques.',
    image: 'https://placehold.co/600x400',
    author: 'Chef Tanaka',
    date: 'June 15, 2023',
    category: 'Culinary Arts',
    tags: ['sushi', 'tradition', 'japanese cuisine']
  },
  {
    id: 2,
    title: "Seasonal Fish: What's Fresh Now",
    excerpt: 'Learn about the seasonal fish varieties that enhance your sushi experience.',
    content: "Seasonality plays a crucial role in Japanese cuisine. Each season brings different fish at their peak of flavor and texture. Spring offers the delicate taste of sea bream, while summer brings rich, fatty tuna. Autumn is perfect for mackerel, and winter showcases exceptional yellowtail. Our menu changes with the seasons to provide you with the most authentic and flavorful experience possible.",
    image: 'https://placehold.co/600x400',
    author: 'Marine Expert Yamamoto',
    date: 'August 3, 2023',
    category: 'Ingredients',
    tags: ['seasonal', 'fish', 'freshness']
  },
  {
    id: 3,
    title: "Sake Pairings for Your Sushi",
    excerpt: 'The perfect sake can elevate your sushi dining experience to new heights.',
    content: "Sake and sushi create a harmony of flavors that's greater than the sum of its parts. For light, white fish, try a crisp Junmai Ginjo. Rich, fatty fish like tuna belly pairs beautifully with a robust Junmai Daiginjo. Don't overlook aged sake (Koshu) with soy-marinated dishes. Our sake sommelier can guide you through our extensive selection to find the perfect match for your meal.",
    image: 'https://placehold.co/600x400',
    author: 'Sake Sommelier Kobayashi',
    date: 'October 12, 2023',
    category: 'Beverages',
    tags: ['sake', 'pairings', 'japanese drinks']
  }
];

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'Yusensu Awarded "Best Sushi Restaurant 2023"',
    excerpt: 'Yusensu has been recognized as the top sushi restaurant in the city by Food & Wine Magazine.',
    date: 'November 5, 2023',
    image: 'https://placehold.co/600x400',
    category: 'Awards'
  },
  {
    id: 2,
    title: 'New Omakase Experience Launches Next Month',
    excerpt: 'Experience our new premium 12-course omakase menu featuring rare seasonal ingredients.',
    date: 'December 1, 2023',
    image: 'https://placehold.co/600x400',
    category: 'Menu Updates'
  },
  {
    id: 3,
    title: 'Sushi Making Workshop: Learn from the Masters',
    excerpt: 'Join our executive chef for a hands-on sushi making workshop every Sunday afternoon.',
    date: 'January 10, 2024',
    image: 'https://placehold.co/600x400',
    category: 'Events'
  }
];

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: 'What is the best way to eat sushi?',
    answer: 'Traditional sushi etiquette suggests eating nigiri in one bite, with your fingers rather than chopsticks. Dip the fish side (not the rice) lightly in soy sauce. For sashimi, use chopsticks and a light dip in soy sauce mixed with a small amount of wasabi.',
    category: 'Dining Etiquette'
  },
  {
    id: 2,
    question: 'Do you accommodate dietary restrictions?',
    answer: 'Yes, we offer vegetarian and vegan sushi options. We also provide gluten-free soy sauce upon request. Please inform your server about any allergies or dietary restrictions when ordering.',
    category: 'Dietary Needs'
  },
  {
    id: 3,
    question: 'What is omakase?',
    answer: 'Omakase means "I leave it up to you" in Japanese. When you order omakase, you\'re entrusting the chef to create a personalized dining experience featuring the freshest seasonal ingredients. It\'s a chef\'s choice tasting menu that showcases their expertise and creativity.',
    category: 'Menu Questions'
  },
  {
    id: 4,
    question: 'Do I need a reservation?',
    answer: 'Reservations are highly recommended, especially for dinner and weekends. You can make a reservation through our website, by phone, or using our mobile app. For omakase dining, reservations are required at least 48 hours in advance.',
    category: 'Reservations'
  },
  {
    id: 5,
    question: 'Is there parking available?',
    answer: 'We offer complimentary valet parking for dinner guests. There is also a public parking garage one block away and street parking (metered until 8pm) in the surrounding area.',
    category: 'Location & Parking'
  }
];

const partners: Partner[] = [
  {
    id: 1,
    name: 'Tsukiji Fish Market',
    description: 'Our primary supplier of premium, sustainably-sourced seafood direct from Japan.',
    logo: 'https://placehold.co/150x150',
    website: 'https://www.tsukiji.com'
  },
  {
    id: 2,
    name: 'Miyako Rice Farms',
    description: 'Providing us with the highest quality short-grain rice, essential for authentic sushi.',
    logo: 'https://placehold.co/150x150',
    website: 'https://www.miyakofarms.com'
  },
  {
    id: 3,
    name: 'Sake Brewery Association',
    description: 'Our partner for curating an exceptional selection of traditional and modern sake.',
    logo: 'https://placehold.co/150x150',
    website: 'https://www.sakebrewers.org'
  },
  {
    id: 4,
    name: 'Local Organic Produce Co-op',
    description: 'Supplying fresh, locally-grown vegetables and microgreens for our dishes.',
    logo: 'https://placehold.co/150x150',
    website: 'https://www.localorganics.com'
  }
];

const MediaHub: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>('blog');

  return (
    <div className="media-hub-page py-5 bg-black">
      <Container fluid className='px-5'>
        <div className="text-center mb-5 mt-5">
          <h1 className="display-4 fw-bold">Media Hub</h1>
          <p className="lead">Explore our content, news, and information center</p>
          <div className="gold-divider mx-auto my-4"></div>
        </div>

        <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k || 'blog')}>
          <Row>
            <Col lg={3} className="mb-4">
              <div className="luxury-tabs-container">
                <Nav variant="pills" className="flex-column luxury-nav">
                  <Nav.Item>
                    <Nav.Link eventKey="blog" className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faBlog} className="me-2" />
                      Blog
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="news" className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faNewspaper} className="me-2" />
                      News
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="faq" className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faQuestionCircle} className="me-2" />
                      FAQ
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="partners" className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faHandshake} className="me-2" />
                      Partners
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </Col>
            
            <Col lg={9}>
              <Tab.Content>
                {/* Blog Tab */}
                <Tab.Pane eventKey="blog">
                  <h2 className="mb-4">Sushi Blog</h2>
                  <p className="mb-4">Explore our collection of articles about Japanese cuisine, sushi traditions, and culinary insights.</p>
                  
                  <Row>
                    {blogPosts.map(post => (
                      <Col md={6} lg={4} className="mb-4" key={post.id}>
                        <Card className="blog-card h-100">
                          <div className="position-relative">
                            <Card.Img variant="top" src={post.image} />
                            <div className="blog-category-badge">
                              {post.category}
                            </div>
                          </div>
                          <Card.Body>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Text className="text-muted">{post.excerpt}</Card.Text>
                            <div className="blog-meta">
                              <span><FontAwesomeIcon icon={faCalendar} className="me-1" /> {post.date}</span>
                              <span><FontAwesomeIcon icon={faUser} className="me-1" /> {post.author}</span>
                            </div>
                          </Card.Body>
                          <Card.Footer className="bg-white">
                            <div className="d-flex flex-wrap">
                              {post.tags.map((tag, index) => (
                                <Badge bg="light" text="dark" className="me-1 mb-1" key={index}>
                                  <FontAwesomeIcon icon={faTags} className="me-1" size="xs" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </Card.Footer>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Tab.Pane>
                
                {/* News Tab */}
                <Tab.Pane eventKey="news">
                  <h2 className="mb-4">Latest News</h2>
                  <p className="mb-4">Stay updated with the latest events and announcements from Yusensu.</p>
                  
                  {newsItems.map(item => (
                    <Card className="mb-4 news-card" key={item.id}>
                      <Row className="g-0">
                        <Col md={4}>
                          <Card.Img src={item.image} className="news-image" />
                        </Col>
                        <Col md={8}>
                          <Card.Body>
                            <div className="d-flex justify-content-between mb-2">
                              <Badge bg="primary">{item.category}</Badge>
                              <small className="text-muted">{item.date}</small>
                            </div>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>{item.excerpt}</Card.Text>
                            <button className="btn-link text-primary p-0">Read more</button>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </Tab.Pane>
                
                {/* FAQ Tab */}
                <Tab.Pane eventKey="faq">
                  <h2 className="mb-4">Frequently Asked Questions</h2>
                  <p className="mb-4">Find answers to common questions about our restaurant and services.</p>
                  
                  <Accordion flush className="luxury-accordion">
                    {faqItems.map(item => (
                      <Accordion.Item eventKey={item.id.toString()} key={item.id} className="mb-3">
                        <Accordion.Header>
                          <span className="fw-bold">{item.question}</span>
                          <Badge bg="secondary" className="ms-2">{item.category}</Badge>
                        </Accordion.Header>
                        <Accordion.Body>
                          {item.answer}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Tab.Pane>
                
                {/* Partners Tab */}
                <Tab.Pane eventKey="partners">
                  <h2 className="mb-4">Our Partners</h2>
                  <p className="mb-4">Learn about the exceptional suppliers and organizations we work with.</p>
                  
                  <Row>
                    {partners.map(partner => (
                      <Col md={6} className="mb-4" key={partner.id}>
                        <Card className="partner-card h-100">
                          <Card.Body className="d-flex flex-column">
                            <div className="partner-logo mb-3">
                              <img 
                                src={partner.logo} 
                                alt={partner.name} 
                                className="rounded-circle"
                                width="80"
                                height="80"
                              />
                            </div>
                            <Card.Title className="fw-bold">{partner.name}</Card.Title>
                            <Card.Text className="flex-grow-1">{partner.description}</Card.Text>
                            <a 
                              href={partner.website} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="btn btn-outline-primary"
                            >
                              Visit Website
                            </a>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Tab.Pane>

                
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default MediaHub;
