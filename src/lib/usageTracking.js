// Usage tracking utility for guest and logged-in users

const GUEST_USAGE_KEY = 'dalsi_guest_messages'
const GUEST_LIMIT = 1
const FREE_USER_LIMIT = 4 // Total: 1 guest + 3 after login

/**
 * Get guest message count from localStorage
 */
export const getGuestMessageCount = () => {
  try {
    const count = localStorage.getItem(GUEST_USAGE_KEY)
    return count ? parseInt(count, 10) : 0
  } catch (error) {
    console.error('Error reading guest usage:', error)
    return 0
  }
}

/**
 * Increment guest message count
 */
export const incrementGuestMessageCount = () => {
  try {
    const current = getGuestMessageCount()
    localStorage.setItem(GUEST_USAGE_KEY, (current + 1).toString())
    return current + 1
  } catch (error) {
    console.error('Error incrementing guest usage:', error)
    return current
  }
}

/**
 * Clear guest message count (call after login)
 */
export const clearGuestMessageCount = () => {
  try {
    localStorage.removeItem(GUEST_USAGE_KEY)
  } catch (error) {
    console.error('Error clearing guest usage:', error)
  }
}

/**
 * Check if guest can send message
 */
export const canGuestSendMessage = () => {
  return getGuestMessageCount() < GUEST_LIMIT
}

/**
 * Check if logged-in user can send message
 * @param {number} userMessageCount - Total messages sent by user from DB
 * @param {object} subscription - User subscription object
 */
export const canUserSendMessage = (userMessageCount, subscription) => {
  // If user has active subscription, allow unlimited
  if (subscription && subscription.status === 'active') {
    return { canSend: true, reason: 'subscribed' }
  }

  // Check if user has reached free limit
  if (userMessageCount >= FREE_USER_LIMIT) {
    return { 
      canSend: false, 
      reason: 'limit_reached',
      remaining: 0
    }
  }

  return { 
    canSend: true, 
    reason: 'free_tier',
    remaining: FREE_USER_LIMIT - userMessageCount
  }
}

/**
 * Get usage status for display
 */
export const getUsageStatus = (isGuest, userMessageCount, subscription) => {
  if (isGuest) {
    const guestCount = getGuestMessageCount()
    return {
      isGuest: true,
      used: guestCount,
      limit: GUEST_LIMIT,
      remaining: Math.max(0, GUEST_LIMIT - guestCount),
      needsLogin: guestCount >= GUEST_LIMIT,
      needsSubscription: false
    }
  }

  if (subscription && subscription.status === 'active') {
    return {
      isGuest: false,
      used: userMessageCount,
      limit: Infinity,
      remaining: Infinity,
      needsLogin: false,
      needsSubscription: false,
      subscriptionType: subscription.plan_type
    }
  }

  return {
    isGuest: false,
    used: userMessageCount,
    limit: FREE_USER_LIMIT,
    remaining: Math.max(0, FREE_USER_LIMIT - userMessageCount),
    needsLogin: false,
    needsSubscription: userMessageCount >= FREE_USER_LIMIT
  }
}

export { GUEST_LIMIT, FREE_USER_LIMIT }
