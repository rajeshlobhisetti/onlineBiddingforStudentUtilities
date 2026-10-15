import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useAuth } from './AuthContext'

const SocketContext = createContext(null)

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const configuredSocketUrl = import.meta.env.VITE_SOCKET_URL;
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const socketUrl = configuredSocketUrl || (isLocal ? 'http://localhost:5000' : null);

      if (!socketUrl) {
        console.log('No socket server URL configured for this environment');
        return;
      }

      const newSocket = io(socketUrl, {
        auth: { userId: user.id }
      })

      newSocket.on('connect', () => {
        console.log('Connected to socket server')
        newSocket.emit('joinUserRoom', user.id)
      })

      // Listen for auction sold notification (for sellers)
      newSocket.on('auctionSold', (data) => {
        console.log('Auction sold notification:', data)
        // You can add toast notification here
        alert(`🎉 Your item "${data.itemTitle}" has been sold for ₹${data.finalPrice}!\n\nBuyer Details:\nName: ${data.buyerDetails.name}\nEmail: ${data.buyerDetails.email}\nPhone: ${data.buyerDetails.phone || 'Not provided'}\nCollege: ${data.buyerDetails.college || 'Not provided'}`)
      })

      // Listen for auction unsold notification (for sellers)
      newSocket.on('auctionUnsold', (data) => {
        console.log('Auction unsold notification:', data)
        alert(`⚠️ Your item "${data.itemTitle}" auction ended without any bids. You can relist it if you want.`)
      })

      setSocket(newSocket)

      return () => {
        newSocket.disconnect()
      }
    }
  }, [user])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}
