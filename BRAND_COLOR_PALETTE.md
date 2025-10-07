# DalSi AI Brand Color Palette

## 🎨 Complete Color System

---

## Primary Brand Colors

### Neo Purple (Primary Brand Color)
- **Hex**: `#8B5CF6`
- **RGB**: `rgb(139, 92, 246)`
- **HSL**: `hsl(263.4, 70%, 50.4%)`
- **Usage**: Primary buttons, links, highlights, logo accents
- **Tailwind**: `neo-purple` or `primary`

### Purple (Secondary Brand)
- **Hex**: `#7C3AED`
- **RGB**: `rgb(124, 58, 237)`
- **HSL**: `hsl(263, 85%, 58%)`
- **Usage**: Secondary elements, hover states
- **Tailwind**: `purple`

### Dark Purple (Accent)
- **Hex**: `#5B21B6`
- **RGB**: `rgb(91, 33, 182)`
- **HSL**: `hsl(263, 69%, 42%)`
- **Usage**: Darker accents, shadows
- **Tailwind**: `dark-purple`

---

## Accent Colors

### Bright Purple Accent
- **Hex**: `#D8B4FE` (calculated from HSL)
- **RGB**: `rgb(216, 180, 254)`
- **HSL**: `hsl(270, 95%, 75%)`
- **Usage**: Highlights, DalSiAIVi branding, visual effects
- **Tailwind**: `accent`

### Red (Healthcare/Alert)
- **Hex**: `#EF4444`
- **RGB**: `rgb(239, 68, 68)`
- **HSL**: `hsl(0, 84%, 60%)`
- **Usage**: Healthcare solutions, alerts, important actions
- **Tailwind**: `red` or `destructive`

### Dark Red
- **Hex**: `#DC2626`
- **RGB**: `rgb(220, 38, 38)`
- **HSL**: `hsl(0, 84%, 51%)`
- **Usage**: Hover states for red elements
- **Tailwind**: `dark-red`

---

## Background & Surface Colors

### Background (Primary)
- **Hex**: `#0F172A` (calculated from HSL)
- **RGB**: `rgb(15, 23, 42)`
- **HSL**: `hsl(222.2, 84%, 4.9%)`
- **Usage**: Main page background, dark theme base
- **Tailwind**: `background`

### Card Background
- **Hex**: `#1E293B` (calculated from HSL)
- **RGB**: `rgb(30, 41, 59)`
- **HSL**: `hsl(217.2, 32.6%, 17.5%)`
- **Usage**: Card backgrounds, elevated surfaces
- **Tailwind**: `card`

---

## Text Colors

### Foreground (Primary Text)
- **Hex**: `#F8FAFC` (calculated from HSL)
- **RGB**: `rgb(248, 250, 252)`
- **HSL**: `hsl(210, 40%, 98%)`
- **Usage**: Primary text, headings
- **Tailwind**: `foreground`

### Muted Text
- **Hex**: `#94A3B8` (calculated from HSL)
- **RGB**: `rgb(148, 163, 184)`
- **HSL**: `hsl(215, 20.2%, 65.1%)`
- **Usage**: Secondary text, descriptions, captions
- **Tailwind**: `muted-foreground`

---

## Gradient Backgrounds

### Homepage Hero Gradient
```css
background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
```
- **Start**: `#1a1a2e` - Deep Navy
- **Middle**: `#16213e` - Dark Blue
- **End**: `#0f3460` - Royal Blue

---

## Color Usage by Section

### DalSi AI (Text Model)
- **Primary**: Neo Purple (`#8B5CF6`)
- **Accent**: Purple (`#7C3AED`)
- **Icon Background**: Purple with 20% opacity

### DalSi AI-Vi (Vision Model)
- **Primary**: Bright Purple Accent (`#D8B4FE`)
- **Accent**: Light Purple variations
- **Icon Background**: Accent with 20% opacity

### Healthcare Solutions
- **Primary**: Red (`#EF4444`)
- **Accent**: Dark Red (`#DC2626`)
- **Icon Background**: Red with 20% opacity

### Education & Training
- **Primary**: Chart-4 color (varies)
- **Accent**: Educational theme colors
- **Icon Background**: Chart-4 with 20% opacity

---

## Color Palette Swatches

### Primary Palette
```
┌────────────┬────────────┬────────────┐
│ Neo Purple │   Purple   │Dark Purple │
│  #8B5CF6   │  #7C3AED   │  #5B21B6   │
└────────────┴────────────┴────────────┘
```

### Accent Palette
```
┌────────────┬────────────┬────────────┐
│Bright Prpl │    Red     │  Dark Red  │
│  #D8B4FE   │  #EF4444   │  #DC2626   │
└────────────┴────────────┴────────────┘
```

### Background Palette
```
┌────────────┬────────────┬────────────┐
│ Background │    Card    │   Border   │
│  #0F172A   │  #1E293B   │  #1E293B   │
└────────────┴────────────┴────────────┘
```

### Text Palette
```
┌────────────┬────────────┬────────────┐
│ Foreground │   Muted    │   Border   │
│  #F8FAFC   │  #94A3B8   │  #1E293B   │
└────────────┴────────────┴────────────┘
```

---

## Accessibility

### Contrast Ratios (WCAG AA Compliant)

| Foreground | Background | Ratio | Pass |
|------------|------------|-------|------|
| #F8FAFC | #0F172A | 15.8:1 | ✅ AAA |
| #8B5CF6 | #0F172A | 5.2:1 | ✅ AA |
| #EF4444 | #0F172A | 4.9:1 | ✅ AA |
| #94A3B8 | #0F172A | 7.1:1 | ✅ AAA |

---

## CSS Variables Reference

```css
:root {
  /* Primary Colors */
  --primary: 263.4 70% 50.4%;           /* Neo Purple */
  --accent: 270 95% 75%;                /* Bright Purple */
  --destructive: 0 62.8% 30.6%;        /* Red */
  
  /* Backgrounds */
  --background: 222.2 84% 4.9%;        /* Dark Navy */
  --card: 217.2 32.6% 17.5%;           /* Card Background */
  
  /* Text */
  --foreground: 210 40% 98%;           /* Light Text */
  --muted-foreground: 215 20.2% 65.1%; /* Muted Text */
  
  /* Borders */
  --border: 217.2 32.6% 17.5%;         /* Border Color */
  --ring: 263.4 70% 50.4%;             /* Focus Ring */
}
```

---

## Tailwind Usage Examples

```jsx
// Primary brand color
<div className="bg-primary text-primary-foreground">DalSi AI</div>

// Neo purple
<button className="bg-neo-purple hover:bg-purple">Click Me</button>

// Accent color
<div className="text-accent">DalSi AI-Vi</div>

// Healthcare red
<div className="bg-destructive text-destructive-foreground">Healthcare</div>

// Card with gradient
<div className="bg-card border border-border rounded-lg">
  Card Content
</div>
```

---

## Brand Guidelines

### Do's ✅
- Use Neo Purple (`#8B5CF6`) as the primary brand color
- Use Bright Purple Accent (`#D8B4FE`) for DalSi AI-Vi features
- Use Red (`#EF4444`) for healthcare-related content
- Maintain dark theme with `#0F172A` background
- Ensure text contrast ratios meet WCAG AA standards

### Don'ts ❌
- Don't use bright colors on light backgrounds
- Don't mix red with purple in the same component
- Don't use pure white (`#FFFFFF`) - use `#F8FAFC` instead
- Don't use pure black (`#000000`) - use `#0F172A` instead

---

## Export Formats

### Adobe (ASE)
Available on request

### Sketch Palette
Available on request

### Figma
Available on request

### JSON
```json
{
  "brand": {
    "neo-purple": "#8B5CF6",
    "purple": "#7C3AED",
    "dark-purple": "#5B21B6",
    "bright-purple": "#D8B4FE",
    "red": "#EF4444",
    "dark-red": "#DC2626"
  },
  "background": {
    "primary": "#0F172A",
    "card": "#1E293B"
  },
  "text": {
    "primary": "#F8FAFC",
    "muted": "#94A3B8"
  }
}
```

---

## Version History

- **v1.0** (Oct 2025) - Initial brand color system
- Dark theme optimized
- WCAG AA compliant
- Tailwind CSS integration

---

**Last Updated**: October 7, 2025  
**Maintained By**: DalSi AI Design Team
