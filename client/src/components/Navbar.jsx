import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

const Navbar = () => {
  const { user, accounts, logout, switchToAccount } = useAuth()
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <Link to="/" className="text-2xl sm:text-3xl font-bold flex items-center tracking-tight">
              <span className="text-3xl sm:text-4xl mr-2">💎</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 font-extrabold">
                CampusBid
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <>
                <Link to="/" className="px-3.5 py-2 rounded-xl hover:bg-white/15 transition-all duration-200 text-sm font-medium backdrop-blur-sm">
                  🏠 Browse
                </Link>
                <Link to="/watchlist" className="px-3.5 py-2 rounded-xl hover:bg-white/15 transition-all duration-200 text-sm font-medium backdrop-blur-sm">
                  ⭐ Watchlist
                </Link>
                <Link to="/bidding-history" className="px-3.5 py-2 rounded-xl hover:bg-white/15 transition-all duration-200 text-sm font-medium backdrop-blur-sm">
                  📊 My Bids
                </Link>
                <Link to="/seller-history" className="px-3.5 py-2 rounded-xl hover:bg-white/15 transition-all duration-200 text-sm font-medium backdrop-blur-sm">
                  💰 My Sales
                </Link>
                <Link to="/dashboard" className="px-3.5 py-2 rounded-xl hover:bg-white/15 transition-all duration-200 text-sm font-medium backdrop-blur-sm">
                  📋 Dashboard
                </Link>
                <Link to="/create-item" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 px-4 py-2 rounded-xl transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  ➕ Sell Item
                </Link>

                <div className="w-px h-8 bg-white/30 mx-2"></div>

                {/* Profile Link */}
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-xl hover:bg-white/15 transition-all duration-200 text-sm font-medium"
                  title="View Profile"
                >
                  {user.profilePicture ? (
                    <img src={user.profilePicture} alt="Profile" className="w-8 h-8 rounded-full border-2 border-white/50 object-cover shadow" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold shadow">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="font-semibold text-sm max-w-[100px] truncate">{user.name}</span>
                </Link>

                {/* Account Switcher Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowAccountMenu(!showAccountMenu)}
                    className="p-2 rounded-xl hover:bg-white/15 transition-all duration-200 text-sm font-semibold flex items-center"
                    title="Switch Account"
                  >
                    <span>👥</span>
                    {accounts.length > 1 && (
                      <span className="ml-1 text-xs bg-pink-500 px-1.5 py-0.5 rounded-full font-bold shadow-md">
                        {accounts.length}
                      </span>
                    )}
                    <span className="ml-1 text-xs">▼</span>
                  </button>

                  {showAccountMenu && (
                    <div className="absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl py-3 z-50 border border-gray-100 text-gray-900">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Switch Account</p>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {accounts.map((account) => (
                          <button
                            key={account.user.id}
                            onClick={() => {
                              switchToAccount(account.user.id)
                              setShowAccountMenu(false)
                            }}
                            className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 ${
                              account.user.id === user.id ? 'bg-indigo-50 font-semibold' : ''
                            }`}
                          >
                            {account.user.profilePicture ? (
                              <img src={account.user.profilePicture} alt="Profile" className="w-9 h-9 rounded-full object-cover shadow-sm" />
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-sm">
                                {account.user.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div className="text-left flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 truncate">{account.user.name}</p>
                              <p className="text-xs text-gray-500 truncate">{account.user.email}</p>
                            </div>
                            {account.user.id === user.id && (
                              <span className="text-green-600 font-bold text-sm">✓ Active</span>
                            )}
                          </button>
                        ))}
                      </div>

                      <div className="border-t border-gray-200 mt-2 pt-2 px-2 space-y-1">
                        <Link
                          to="/profile"
                          onClick={() => setShowAccountMenu(false)}
                          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium"
                        >
                          👤 View Full Profile
                        </Link>
                        <Link
                          to="/login"
                          onClick={() => setShowAccountMenu(false)}
                          className="block px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition font-medium"
                        >
                          + Add / Login Another Account
                        </Link>
                        <button
                          onClick={() => {
                            logout()
                            setShowAccountMenu(false)
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
                        >
                          🚪 Log Out All Accounts
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="px-5 py-2.5 rounded-xl hover:bg-white/15 transition-all duration-200 text-sm font-medium backdrop-blur-sm">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 px-5 py-2.5 rounded-xl transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Register Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center space-x-2">
            {user && (
              <Link to="/profile" className="flex items-center">
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" className="w-8 h-8 rounded-full border border-white object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </Link>
            )}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-lg hover:bg-white/20 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showMobileMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <div className="md:hidden bg-indigo-900/95 backdrop-blur-lg px-4 pt-2 pb-6 space-y-2 border-t border-indigo-700">
          {user ? (
            <>
              <Link
                to="/"
                onClick={() => setShowMobileMenu(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-indigo-800"
              >
                🏠 Browse Items
              </Link>
              <Link
                to="/watchlist"
                onClick={() => setShowMobileMenu(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-indigo-800"
              >
                ⭐ My Watchlist
              </Link>
              <Link
                to="/bidding-history"
                onClick={() => setShowMobileMenu(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-indigo-800"
              >
                📊 My Bids
              </Link>
              <Link
                to="/seller-history"
                onClick={() => setShowMobileMenu(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-indigo-800"
              >
                💰 My Sales History
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setShowMobileMenu(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-indigo-800"
              >
                📋 Seller Dashboard
              </Link>
              <Link
                to="/create-item"
                onClick={() => setShowMobileMenu(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium bg-pink-600 hover:bg-pink-700 text-center"
              >
                ➕ Sell New Item
              </Link>
              <Link
                to="/profile"
                onClick={() => setShowMobileMenu(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-indigo-800"
              >
                👤 Profile ({user.name})
              </Link>
              <button
                onClick={() => {
                  logout()
                  setShowMobileMenu(false)
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-red-300 hover:bg-indigo-800"
              >
                🚪 Log Out
              </button>
            </>
          ) : (
            <div className="space-y-2 pt-2">
              <Link
                to="/login"
                onClick={() => setShowMobileMenu(false)}
                className="block w-full text-center py-2 px-4 rounded-lg bg-indigo-700 hover:bg-indigo-800 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setShowMobileMenu(false)}
                className="block w-full text-center py-2 px-4 rounded-lg bg-pink-600 hover:bg-pink-700 font-medium"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
