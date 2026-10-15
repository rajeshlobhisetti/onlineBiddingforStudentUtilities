require('dotenv').config();
const bcrypt = require('bcryptjs');
const prisma = require('./config/database');

const seed = async () => {
  try {
    console.log('Starting seed...');

    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create / upsert sample users
    const seller1 = await prisma.user.upsert({
      where: { email: 'seller1@campus.edu' },
      update: {
        name: 'Alice Johnson',
        role: 'both',
        rollNumber: '23CS101',
        college: 'Campus Tech Institute',
        phone: '+91 9876543210'
      },
      create: {
        name: 'Alice Johnson',
        email: 'seller1@campus.edu',
        password: hashedPassword,
        role: 'both',
        rollNumber: '23CS101',
        college: 'Campus Tech Institute',
        phone: '+91 9876543210'
      }
    });

    const seller2 = await prisma.user.upsert({
      where: { email: 'seller2@campus.edu' },
      update: {
        name: 'Bob Smith',
        role: 'both',
        rollNumber: '23EE204',
        college: 'Campus Tech Institute',
        phone: '+91 9876543211'
      },
      create: {
        name: 'Bob Smith',
        email: 'seller2@campus.edu',
        password: hashedPassword,
        role: 'both',
        rollNumber: '23EE204',
        college: 'Campus Tech Institute',
        phone: '+91 9876543211'
      }
    });

    const buyer1 = await prisma.user.upsert({
      where: { email: 'buyer1@campus.edu' },
      update: {
        name: 'Charlie Brown',
        role: 'both',
        rollNumber: '23ME305',
        college: 'Campus Tech Institute',
        phone: '+91 9876543212'
      },
      create: {
        name: 'Charlie Brown',
        email: 'buyer1@campus.edu',
        password: hashedPassword,
        role: 'both',
        rollNumber: '23ME305',
        college: 'Campus Tech Institute',
        phone: '+91 9876543212'
      }
    });

    const buyer2 = await prisma.user.upsert({
      where: { email: 'buyer2@campus.edu' },
      update: {
        name: 'Diana Prince',
        role: 'both',
        rollNumber: '23IT409',
        college: 'Campus Tech Institute',
        phone: '+91 9876543213'
      },
      create: {
        name: 'Diana Prince',
        email: 'buyer2@campus.edu',
        password: hashedPassword,
        role: 'both',
        rollNumber: '23IT409',
        college: 'Campus Tech Institute',
        phone: '+91 9876543213'
      }
    });

    console.log('Users created / updated');

    const now = new Date();
    const liveStart = new Date(now.getTime() - 45 * 60 * 1000); // 45 min ago
    const liveEnd1 = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now
    const liveEnd2 = new Date(now.getTime() + 4 * 60 * 60 * 1000); // 4 hours from now
    const liveEnd3 = new Date(now.getTime() + 90 * 60 * 1000); // 90 min from now
    const upcomingStart = new Date(now.getTime() + 30 * 60 * 1000); // Starts in 30 min
    const upcomingEnd = new Date(now.getTime() + 25 * 60 * 60 * 1000); // Ends in 25 hours
    const endedStart = new Date(now.getTime() - 5 * 60 * 60 * 1000);
    const endedEnd = new Date(now.getTime() - 30 * 60 * 1000);

    // Delete existing sample items for clean re-seeding if needed
    // First, let's create or update items
    // Item 1: Calculus book (Live)
    let book1 = await prisma.item.findFirst({ where: { title: 'Calculus: Early Transcendentals 8th Edition' } });
    if (!book1) {
      book1 = await prisma.item.create({
        data: {
          title: 'Calculus: Early Transcendentals 8th Edition',
          description: 'Excellent condition calculus textbook by James Stewart. No annotations or missing pages. Ideal for First Year Engineering.',
          category: 'books',
          images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'],
          condition: 'like-new',
          sellerId: seller1.id,
          originalBuyingPrice: 1200,
          usageTime: '6 months',
          startingPrice: 450,
          currentHighestBid: 600,
          currentHighestBidderId: buyer1.id,
          startTime: liveStart,
          endTime: liveEnd1,
          status: 'live',
          bidIncrementMin: 50,
          antiSnipeWindowSeconds: 30,
          antiSnipeExtensionSeconds: 60
        }
      });
    } else {
      book1 = await prisma.item.update({
        where: { id: book1.id },
        data: {
          startTime: liveStart,
          endTime: liveEnd1,
          status: 'live',
          currentHighestBid: 600,
          currentHighestBidderId: buyer1.id
        }
      });
    }

    // Item 2: TI-84 Plus Graphing Calculator (Live)
    let calc1 = await prisma.item.findFirst({ where: { title: 'TI-84 Plus Graphing Calculator' } });
    if (!calc1) {
      calc1 = await prisma.item.create({
        data: {
          title: 'TI-84 Plus Graphing Calculator',
          description: 'Texas Instruments TI-84 Plus in pristine condition. Includes slide case, charging cable, and fresh batteries.',
          category: 'calculators',
          images: ['https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80'],
          condition: 'good',
          sellerId: seller2.id,
          originalBuyingPrice: 3500,
          usageTime: '1 year',
          startingPrice: 1500,
          currentHighestBid: 1800,
          currentHighestBidderId: buyer2.id,
          startTime: liveStart,
          endTime: liveEnd2,
          status: 'live',
          bidIncrementMin: 100,
          antiSnipeWindowSeconds: 30,
          antiSnipeExtensionSeconds: 60
        }
      });
    } else {
      calc1 = await prisma.item.update({
        where: { id: calc1.id },
        data: {
          startTime: liveStart,
          endTime: liveEnd2,
          status: 'live',
          currentHighestBid: 1800,
          currentHighestBidderId: buyer2.id
        }
      });
    }

    // Item 3: Mountain Bike (Live)
    let cycle1 = await prisma.item.findFirst({ where: { title: 'Hero Sprint Pro 26T Mountain Bike' } });
    if (!cycle1) {
      cycle1 = await prisma.item.create({
        data: {
          title: 'Hero Sprint Pro 26T Mountain Bike',
          description: '21-speed Shimano geared bicycle, perfect for campus commuting. Recently serviced with new dual disc brakes and bell.',
          category: 'cycles',
          images: ['https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80'],
          condition: 'good',
          sellerId: seller1.id,
          originalBuyingPrice: 9500,
          usageTime: '1.5 years',
          startingPrice: 4000,
          currentHighestBid: 4000,
          currentHighestBidderId: null,
          startTime: liveStart,
          endTime: liveEnd3,
          status: 'live',
          bidIncrementMin: 200,
          antiSnipeWindowSeconds: 30,
          antiSnipeExtensionSeconds: 60
        }
      });
    } else {
      cycle1 = await prisma.item.update({
        where: { id: cycle1.id },
        data: {
          startTime: liveStart,
          endTime: liveEnd3,
          status: 'live'
        }
      });
    }

    // Item 4: Algorithms textbook (Upcoming)
    let book2 = await prisma.item.findFirst({ where: { title: 'Introduction to Algorithms (CLRS 3rd Edition)' } });
    if (!book2) {
      book2 = await prisma.item.create({
        data: {
          title: 'Introduction to Algorithms (CLRS 3rd Edition)',
          description: 'The definitive textbook for algorithms and data structures. Hardcover edition in pristine condition.',
          category: 'books',
          images: ['https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=800&q=80'],
          condition: 'like-new',
          sellerId: seller2.id,
          originalBuyingPrice: 2000,
          usageTime: '8 months',
          startingPrice: 900,
          currentHighestBid: 900,
          currentHighestBidderId: null,
          startTime: upcomingStart,
          endTime: upcomingEnd,
          status: 'upcoming',
          bidIncrementMin: 50,
          antiSnipeWindowSeconds: 30,
          antiSnipeExtensionSeconds: 60
        }
      });
    }

    // Item 5: Casio Calculator (Upcoming)
    let calc2 = await prisma.item.findFirst({ where: { title: 'Casio FX-991EX ClassWiz Calculator' } });
    if (!calc2) {
      calc2 = await prisma.item.create({
        data: {
          title: 'Casio FX-991EX ClassWiz Calculator',
          description: 'High-resolution LCD display with 552 functions. Allowed in all university and competitive examinations.',
          category: 'calculators',
          images: ['https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=800&q=80'],
          condition: 'new',
          sellerId: seller1.id,
          originalBuyingPrice: 1600,
          usageTime: 'Unopened box',
          startingPrice: 950,
          currentHighestBid: 950,
          currentHighestBidderId: null,
          startTime: upcomingStart,
          endTime: upcomingEnd,
          status: 'upcoming',
          bidIncrementMin: 25,
          antiSnipeWindowSeconds: 30,
          antiSnipeExtensionSeconds: 60
        }
      });
    }

    // Item 6: Ended / Settled Item
    let endedItem = await prisma.item.findFirst({ where: { title: 'Sony WH-1000XM4 Noise Canceling Headphones' } });
    if (!endedItem) {
      endedItem = await prisma.item.create({
        data: {
          title: 'Sony WH-1000XM4 Noise Canceling Headphones',
          description: 'Industry-leading noise canceling headphones with 30-hour battery life. Includes original hard case and aux cable.',
          category: 'other',
          images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
          condition: 'good',
          sellerId: seller1.id,
          originalBuyingPrice: 22000,
          usageTime: '1 year',
          startingPrice: 8000,
          currentHighestBid: 12500,
          currentHighestBidderId: buyer1.id,
          startTime: endedStart,
          endTime: endedEnd,
          status: 'settled',
          bidIncrementMin: 500,
          antiSnipeWindowSeconds: 30,
          antiSnipeExtensionSeconds: 60
        }
      });
    }

    console.log('Items created / updated');

    // Clean old bids for book1 and calc1, then insert current bids
    await prisma.bid.deleteMany({
      where: {
        itemId: { in: [book1.id, calc1.id, endedItem.id] }
      }
    });

    await prisma.bid.create({
      data: {
        itemId: book1.id,
        bidderId: buyer2.id,
        amount: 500,
        timestamp: new Date(now.getTime() - 25 * 60 * 1000),
        isWinning: false
      }
    });

    await prisma.bid.create({
      data: {
        itemId: book1.id,
        bidderId: buyer1.id,
        amount: 550,
        timestamp: new Date(now.getTime() - 15 * 60 * 1000),
        isWinning: false
      }
    });

    await prisma.bid.create({
      data: {
        itemId: book1.id,
        bidderId: buyer1.id,
        amount: 600,
        timestamp: new Date(now.getTime() - 5 * 60 * 1000),
        isWinning: true
      }
    });

    await prisma.bid.create({
      data: {
        itemId: calc1.id,
        bidderId: buyer1.id,
        amount: 1600,
        timestamp: new Date(now.getTime() - 20 * 60 * 1000),
        isWinning: false
      }
    });

    await prisma.bid.create({
      data: {
        itemId: calc1.id,
        bidderId: buyer2.id,
        amount: 1800,
        timestamp: new Date(now.getTime() - 8 * 60 * 1000),
        isWinning: true
      }
    });

    await prisma.bid.create({
      data: {
        itemId: endedItem.id,
        bidderId: buyer1.id,
        amount: 12500,
        timestamp: new Date(endedEnd.getTime() - 5 * 60 * 1000),
        isWinning: true
      }
    });

    console.log('Bids created');

    // Create settlement for endedItem if not exists
    const existingSettlement = await prisma.settlement.findUnique({
      where: { itemId: endedItem.id }
    });

    if (!existingSettlement) {
      await prisma.settlement.create({
        data: {
          itemId: endedItem.id,
          sellerId: seller1.id,
          buyerId: buyer1.id,
          finalPrice: 12500,
          status: 'pending_pickup',
          notes: 'Meet at Student Activity Center at 4 PM tomorrow.'
        }
      });
    }

    // Add watchlists
    await prisma.watchlist.deleteMany({
      where: {
        userId: { in: [buyer1.id, buyer2.id] }
      }
    });

    await prisma.watchlist.create({
      data: {
        userId: buyer1.id,
        itemId: calc1.id
      }
    });

    await prisma.watchlist.create({
      data: {
        userId: buyer2.id,
        itemId: book1.id
      }
    });

    await prisma.watchlist.create({
      data: {
        userId: buyer1.id,
        itemId: cycle1.id
      }
    });

    console.log('Watchlist entries created');

    console.log('\nSeed completed successfully!');
    console.log('Sample test accounts (password: password123):');
    console.log('1. seller1@campus.edu (Alice Johnson) - Seller of Calculus book & Cycle');
    console.log('2. seller2@campus.edu (Bob Smith) - Seller of TI-84 & CLRS book');
    console.log('3. buyer1@campus.edu (Charlie Brown) - Winning bidder on Calculus book');
    console.log('4. buyer2@campus.edu (Diana Prince) - Winning bidder on TI-84');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
