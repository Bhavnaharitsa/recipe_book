import { useState } from 'react'
import './App.css'

function RecipeDetail({ recipe }) {
  const categoryImage = recipe.category === 'breakfast' ? '/images/chutneys_category_image.png' :
    recipe.category === 'lunch' ? '/images/sweets_category_image.png' :
    recipe.category === 'dinner' ? '/images/sabzi_image.png' :
    '/images/main_gravies_category_image.png'

  // Parse prep time and cook time
  const parseTime = (timeStr) => {
    if (!timeStr) return 'N/A'
    const hoursMatch = timeStr.match(/(\d+)\s*hours?/i)
    const minsMatch = timeStr.match(/(\d+)\s*min/i)
    if (hoursMatch) return `${hoursMatch[1]} Hrs`
    if (minsMatch) return `${minsMatch[1]} Mins`
    return timeStr
  }

  const prepTime = parseTime(recipe.prepTime)
  const cookTime = parseTime(recipe.cookTime)
  
  // Determine difficulty
  const getDifficulty = () => {
    const prepHours = recipe.prepTime?.match(/(\d+)\s*hours?/i)?.[1] || 0
    const cookMins = parseInt(recipe.cookTime?.match(/(\d+)\s*min/i)?.[1] || 0)
    if (prepHours > 0 || cookMins > 45) return 'Hard'
    if (cookMins > 25) return 'Medium'
    return 'Easy'
  }

  const difficulty = getDifficulty()
  
  // Get category name for tag
  const categoryNames = {
    breakfast: 'CHUTNEYS',
    lunch: 'SWEETS',
    dinner: 'SABZIS',
    snacks: 'MAIN GRAVIES'
  }

  // Group ingredients by section (if they have section headers like "For Masala:")
  const groupIngredients = () => {
    const groups = []
    let currentGroup = { title: null, items: [] }
    
    recipe.ingredients.forEach((ingredient) => {
      if (ingredient.includes(':') && ingredient.length < 30) {
        if (currentGroup.items.length > 0) {
          groups.push(currentGroup)
        }
        currentGroup = { title: ingredient.replace(':', ''), items: [] }
      } else {
        currentGroup.items.push(ingredient)
      }
    })
    
    if (currentGroup.items.length > 0) {
      groups.push(currentGroup)
    }
    
    return groups.length > 0 ? groups : [{ title: null, items: recipe.ingredients }]
  }

  const ingredientGroups = groupIngredients()

  // Group instructions by section (if needed)
  const groupInstructions = () => {
    // For now, just return all instructions as one group
    // Can be enhanced later if instructions have sections
    return [{ title: null, items: recipe.instructions }]
  }

  const instructionGroups = groupInstructions()

  return (
    <div className="recipe-detail-new-container">
      {/* Header Section */}
      <div className="recipe-detail-new-header">
        <div className="recipe-category-tag">{categoryNames[recipe.category] || 'RECIPE'}</div>
        <h1 className="recipe-detail-new-title">{recipe.title}</h1>
        <p className="recipe-detail-new-description">{recipe.description}</p>
        <div className="recipe-detail-divider"></div>
        <div className="recipe-metrics-table">
          <div className="metric-item">
            <div className="metric-label">PREP TIME</div>
            <div className="metric-value">{prepTime}</div>
          </div>
          <div className="metric-item">
            <div className="metric-label">COOK TIME</div>
            <div className="metric-value">{cookTime}</div>
          </div>
          <div className="metric-item">
            <div className="metric-label">SERVINGS</div>
            <div className="metric-value">{recipe.servings} People</div>
          </div>
          <div className="metric-item">
            <div className="metric-label">DIFFICULTY</div>
            <div className="metric-value">{difficulty}</div>
          </div>
        </div>
      </div>

      {/* Main Image */}
      <div className="recipe-detail-new-image">
        <img 
          src={categoryImage} 
          alt={recipe.title}
          className="recipe-detail-main-image"
        />
      </div>

      {/* Two Column Layout */}
      <div className="recipe-detail-new-content">
        {/* Left Column - Ingredients */}
        <div className="recipe-ingredients-column">
          <div className="section-header">
            <span className="section-icon">🍲</span>
            <h2 className="section-title">Ingredients</h2>
          </div>
          {ingredientGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="ingredient-group">
              {group.title && (
                <h3 className="ingredient-group-title">{group.title}</h3>
              )}
              <ul className="ingredients-list-new">
                {group.items.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Right Column - Instructions */}
        <div className="recipe-instructions-column">
          <div className="section-header">
            <span className="section-icon">👨‍🍳</span>
            <h2 className="section-title">Instructions</h2>
          </div>
          {instructionGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="instruction-group">
              {group.title && (
                <h3 className="instruction-group-title">{group.title}</h3>
              )}
              <ol className="instructions-list-new">
                {group.items.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const categories = [
  {
    id: 'breakfast',
    name: 'Chutneys',
    icon: '🥄',
    description: 'Delicious and flavorful chutneys to complement your meals',
    color: '#FF6B35'
  },
  {
    id: 'lunch',
    name: 'Sweets',
    icon: '🍬',
    description: 'Traditional South Indian sweets and desserts',
    color: '#F7931E'
  },
  {
    id: 'dinner',
    name: 'Sabzis',
    icon: '🥘',
    description: 'Tasty vegetable dishes and curries from South India',
    color: '#8B4513'
  },
  {
    id: 'snacks',
    name: 'Main Gravies',
    icon: '🍿',
    description: 'Crispy and delicious South Indian snacks',
    color: '#FFD700'
  }
]

const recipes = {
  breakfast: [
    {
      id: 1,
      title: 'Masala Dosa',
      description: 'Crispy fermented crepe filled with spiced potato filling',
      prepTime: '8 hours (fermentation)',
      cookTime: '20 min',
      servings: 4,
      category: 'breakfast',
      ingredients: [
        '2 cups rice',
        '1 cup urad dal (split black gram)',
        '1/2 tsp fenugreek seeds',
        'Salt to taste',
        'Water for soaking and grinding',
        'For Masala:',
        '4 large potatoes, boiled and cubed',
        '2 onions, sliced',
        '2 green chilies, chopped',
        '1 tsp mustard seeds',
        '1 tsp cumin seeds',
        '1/2 tsp turmeric powder',
        'Curry leaves',
        '2 tbsp oil',
        'Salt to taste'
      ],
      instructions: [
        'Soak rice, urad dal, and fenugreek seeds separately for 6 hours',
        'Grind urad dal to smooth paste, rice to slightly coarse paste',
        'Mix both batters, add salt, and ferment overnight',
        'For masala: Heat oil, add mustard and cumin seeds',
        'Add curry leaves, green chilies, and onions',
        'Sauté until onions are translucent',
        'Add turmeric, boiled potatoes, and salt',
        'Mash slightly and mix well',
        'Heat a dosa tawa, pour batter in circular motion',
        'Cook until golden brown, add masala in center',
        'Fold and serve hot with coconut chutney and sambar'
      ]
    },
    {
      id: 2,
      title: 'Idli',
      description: 'Soft, fluffy steamed rice cakes - a South Indian staple',
      prepTime: '8 hours (fermentation)',
      cookTime: '15 min',
      servings: 4,
      category: 'breakfast',
      ingredients: [
        '2 cups idli rice',
        '1 cup urad dal',
        '1/2 tsp fenugreek seeds',
        'Salt to taste',
        'Water for soaking'
      ],
      instructions: [
        'Soak rice and urad dal separately for 6 hours',
        'Grind urad dal to smooth, fluffy paste',
        'Grind rice to slightly coarse paste',
        'Mix both batters, add salt',
        'Ferment overnight in warm place',
        'Grease idli plates, pour batter',
        'Steam for 10-12 minutes',
        'Serve hot with sambar and chutney'
      ]
    },
    {
      id: 3,
      title: 'Pongal',
      description: 'Creamy rice and lentil porridge, perfect for breakfast',
      prepTime: '10 min',
      cookTime: '25 min',
      servings: 4,
      category: 'breakfast',
      ingredients: [
        '1 cup rice',
        '1/2 cup moong dal (yellow lentils)',
        '4 cups water',
        '1 tsp black peppercorns',
        '1 tsp cumin seeds',
        '2 tbsp ghee',
        '10-12 cashews',
        'Curry leaves',
        'Ginger, grated',
        'Salt to taste'
      ],
      instructions: [
        'Dry roast moong dal until golden',
        'Wash rice and dal together',
        'Pressure cook with water for 3-4 whistles',
        'Heat ghee, add peppercorns and cumin',
        'Add cashews, curry leaves, and ginger',
        'Sauté until cashews are golden',
        'Add to cooked rice-dal mixture',
        'Mash slightly, add salt',
        'Cook for 2-3 minutes until creamy',
        'Serve hot with coconut chutney'
      ]
    }
  ],
  lunch: [
    {
      id: 4,
      title: 'Sambar',
      description: 'Tangy lentil stew with vegetables - the heart of South Indian meals',
      prepTime: '15 min',
      cookTime: '30 min',
      servings: 6,
      category: 'lunch',
      ingredients: [
        '1 cup toor dal (pigeon peas)',
        '1 cup mixed vegetables (drumstick, okra, pumpkin)',
        '1 onion, chopped',
        '1 tomato, chopped',
        '2 tbsp sambar powder',
        '1/2 tsp turmeric',
        'Tamarind pulp (lemon-sized ball)',
        '1 tsp mustard seeds',
        '1/2 tsp fenugreek seeds',
        'Curry leaves',
        '2 red chilies',
        '2 tbsp oil',
        'Salt to taste',
        'Coriander leaves'
      ],
      instructions: [
        'Pressure cook toor dal until soft',
        'Soak tamarind in warm water, extract pulp',
        'Cook vegetables in tamarind water',
        'Add sambar powder and turmeric',
        'Mash dal and add to vegetables',
        'Simmer for 10 minutes',
        'Heat oil for tempering',
        'Add mustard seeds, fenugreek, red chilies, curry leaves',
        'Pour tempering over sambar',
        'Garnish with coriander leaves',
        'Serve hot with rice'
      ]
    },
    {
      id: 5,
      title: 'Rasam',
      description: 'Spicy, tangy soup made with tamarind and spices',
      prepTime: '10 min',
      cookTime: '20 min',
      servings: 4,
      category: 'lunch',
      ingredients: [
        '1/2 cup toor dal',
        'Tamarind pulp (small lemon-sized)',
        '2 tomatoes, chopped',
        '2 tsp rasam powder',
        '1/2 tsp turmeric',
        '1 tsp mustard seeds',
        '1/2 tsp cumin seeds',
        'Curry leaves',
        'Coriander leaves',
        '2 red chilies',
        '2 tbsp oil',
        'Salt to taste',
        'Asafoetida (hing)'
      ],
      instructions: [
        'Cook toor dal until soft, mash well',
        'Soak tamarind, extract pulp',
        'Boil tamarind water with tomatoes',
        'Add rasam powder, turmeric, salt',
        'Add mashed dal, simmer',
        'Heat oil, add mustard and cumin seeds',
        'Add red chilies, curry leaves, asafoetida',
        'Pour tempering over rasam',
        'Garnish with coriander',
        'Serve hot as soup or with rice'
      ]
    },
    {
      id: 6,
      title: 'Coconut Rice',
      description: 'Fragrant rice cooked with fresh coconut and spices',
      prepTime: '10 min',
      cookTime: '25 min',
      servings: 4,
      category: 'lunch',
      ingredients: [
        '2 cups cooked rice',
        '1 cup fresh grated coconut',
        '2 tbsp oil',
        '1 tsp mustard seeds',
        '1 tsp urad dal',
        '1 tsp chana dal',
        '2 red chilies',
        'Curry leaves',
        'Cashews',
        'Salt to taste',
        'Turmeric powder'
      ],
      instructions: [
        'Cook rice and let it cool',
        'Heat oil in a pan',
        'Add mustard seeds, urad dal, chana dal',
        'Add red chilies and curry leaves',
        'Add cashews and roast until golden',
        'Add grated coconut, sauté for 2 minutes',
        'Add turmeric and salt',
        'Mix in cooked rice gently',
        'Cook for 2-3 minutes',
        'Serve hot'
      ]
    }
  ],
  dinner: [
    {
      id: 7,
      title: 'Bisi Bele Bath',
      description: 'Spicy rice and lentil one-pot meal from Karnataka',
      prepTime: '20 min',
      cookTime: '30 min',
      servings: 4,
      category: 'dinner',
      ingredients: [
        '1 cup rice',
        '1/2 cup toor dal',
        'Mixed vegetables (beans, carrot, peas)',
        '2 tbsp bisi bele bath powder',
        'Tamarind pulp',
        '1 onion, chopped',
        '1 tomato, chopped',
        '2 tbsp ghee',
        'Mustard seeds, curry leaves',
        'Cashews',
        'Salt to taste'
      ],
      instructions: [
        'Pressure cook rice and dal together',
        'Cook vegetables separately',
        'Heat ghee, add mustard seeds',
        'Add curry leaves, onions, tomatoes',
        'Add bisi bele bath powder',
        'Add tamarind pulp and water',
        'Mix in cooked rice-dal mixture',
        'Add vegetables, simmer',
        'Garnish with cashews and ghee',
        'Serve hot with papad'
      ]
    },
    {
      id: 8,
      title: 'Curd Rice',
      description: 'Cooling yogurt rice - perfect end to a South Indian meal',
      prepTime: '5 min',
      cookTime: '15 min',
      servings: 4,
      category: 'dinner',
      ingredients: [
        '2 cups cooked rice',
        '1 cup thick curd (yogurt)',
        '1 tbsp oil',
        '1 tsp mustard seeds',
        '1 tsp urad dal',
        'Green chilies, chopped',
        'Ginger, grated',
        'Curry leaves',
        'Salt to taste',
        'Milk (optional)'
      ],
      instructions: [
        'Mash cooked rice slightly when warm',
        'Add curd and mix well',
        'Add salt and mix',
        'Heat oil for tempering',
        'Add mustard seeds and urad dal',
        'Add green chilies, ginger, curry leaves',
        'Pour tempering over curd rice',
        'Mix gently, add milk if needed',
        'Serve at room temperature',
        'Garnish with coriander or pomegranate'
      ]
    }
  ],
  snacks: [
    {
      id: 9,
      title: 'Medu Vada',
      description: 'Crispy, fluffy lentil fritters - perfect tea-time snack',
      prepTime: '4 hours (soaking)',
      cookTime: '20 min',
      servings: 4,
      category: 'snacks',
      ingredients: [
        '2 cups urad dal',
        '2 green chilies, chopped',
        '1 inch ginger, grated',
        'Peppercorns',
        'Curry leaves, chopped',
        'Salt to taste',
        'Oil for deep frying'
      ],
      instructions: [
        'Soak urad dal for 4 hours',
        'Grind to smooth, fluffy paste',
        'Add salt and mix well',
        'Add green chilies, ginger, peppercorns, curry leaves',
        'Heat oil for deep frying',
        'Wet hands, shape vadas with hole in center',
        'Fry until golden brown and crispy',
        'Drain on paper towel',
        'Serve hot with coconut chutney and sambar'
      ]
    },
    {
      id: 10,
      title: 'Bonda',
      description: 'Crispy potato-filled fritters from South India',
      prepTime: '20 min',
      cookTime: '20 min',
      servings: 4,
      category: 'snacks',
      ingredients: [
        'For filling:',
        '4 potatoes, boiled and mashed',
        '1 onion, chopped',
        '2 green chilies',
        'Ginger, grated',
        'Curry leaves',
        'Turmeric, salt',
        'For batter:',
        '1 cup besan (gram flour)',
        'Rice flour',
        'Red chili powder',
        'Salt',
        'Water',
        'Oil for frying'
      ],
      instructions: [
        'Heat oil, add onions, green chilies, ginger',
        'Add curry leaves, turmeric',
        'Add mashed potatoes, salt, mix well',
        'Make small balls of potato mixture',
        'Make batter with besan, rice flour, spices',
        'Dip potato balls in batter',
        'Deep fry until golden and crispy',
        'Serve hot with chutney'
      ]
    },
    {
      id: 11,
      title: 'Rava Upma',
      description: 'Semolina-based savory breakfast or snack',
      prepTime: '5 min',
      cookTime: '15 min',
      servings: 4,
      category: 'snacks',
      ingredients: [
        '1 cup rava (semolina)',
        '2 cups water',
        '1 onion, chopped',
        '2 green chilies',
        'Ginger, grated',
        'Curry leaves',
        'Mustard seeds, urad dal',
        'Cashews',
        '2 tbsp oil',
        'Salt to taste',
        'Lemon juice'
      ],
      instructions: [
        'Dry roast rava until fragrant',
        'Heat oil, add mustard seeds, urad dal',
        'Add cashews, curry leaves',
        'Add onions, green chilies, ginger',
        'Sauté until onions are translucent',
        'Add water, salt, bring to boil',
        'Add roasted rava, stir continuously',
        'Cook until water is absorbed',
        'Add lemon juice, mix well',
        'Serve hot'
      ]
    }
  ],
  desserts: [
    {
      id: 12,
      title: 'Payasam',
      description: 'Creamy rice pudding with jaggery and cardamom',
      prepTime: '10 min',
      cookTime: '30 min',
      servings: 6,
      category: 'desserts',
      ingredients: [
        '1/2 cup rice',
        '1/2 cup jaggery, grated',
        '4 cups milk',
        '1/2 cup coconut milk',
        'Cardamom powder',
        'Cashews and raisins',
        '2 tbsp ghee',
        'Saffron strands (optional)'
      ],
      instructions: [
        'Wash and soak rice for 30 minutes',
        'Cook rice in milk until soft',
        'Add jaggery, stir until dissolved',
        'Add coconut milk, cardamom',
        'Heat ghee, fry cashews and raisins',
        'Add to payasam',
        'Garnish with saffron',
        'Serve warm or chilled'
      ]
    },
    {
      id: 13,
      title: 'Rava Kesari',
      description: 'Sweet semolina pudding - a festival favorite',
      prepTime: '5 min',
      cookTime: '15 min',
      servings: 4,
      category: 'desserts',
      ingredients: [
        '1 cup rava (semolina)',
        '1 cup sugar',
        '3 cups water',
        '4 tbsp ghee',
        'Cardamom powder',
        'Cashews and raisins',
        'Saffron strands',
        'Food color (orange/yellow)'
      ],
      instructions: [
        'Heat ghee, roast rava until golden',
        'Boil water separately',
        'Add hot water to rava, stir continuously',
        'Cook until rava is soft',
        'Add sugar, mix well',
        'Add cardamom, saffron, food color',
        'Fry cashews and raisins in ghee',
        'Add to kesari, mix',
        'Serve hot'
      ]
    }
  ],
  beverages: [
    {
      id: 14,
      title: 'Filter Coffee',
      description: 'Traditional South Indian filter coffee - strong and aromatic',
      prepTime: '5 min',
      cookTime: '10 min',
      servings: 2,
      category: 'beverages',
      ingredients: [
        '2 tbsp coffee powder (South Indian blend)',
        '2 cups water',
        '2 cups milk',
        'Sugar to taste',
        'Coffee filter set'
      ],
      instructions: [
        'Boil water',
        'Add coffee powder to filter',
        'Pour hot water over coffee',
        'Let it drip for 10-15 minutes',
        'Boil milk separately',
        'Mix decoction with hot milk',
        'Add sugar to taste',
        'Pour between two containers to froth',
        'Serve hot in traditional tumbler'
      ]
    },
    {
      id: 15,
      title: 'Buttermilk (Moru)',
      description: 'Cooling spiced buttermilk - perfect for hot days',
      prepTime: '5 min',
      cookTime: '0 min',
      servings: 4,
      category: 'beverages',
      ingredients: [
        '2 cups buttermilk',
        '1 cup water',
        'Salt to taste',
        'Ginger, grated',
        'Green chilies, chopped',
        'Curry leaves',
        'Coriander leaves',
        'Asafoetida'
      ],
      instructions: [
        'Whisk buttermilk with water',
        'Add salt, mix well',
        'Add grated ginger',
        'Add chopped green chilies',
        'Add curry leaves and coriander',
        'Add pinch of asafoetida',
        'Mix well, chill',
        'Serve cold'
      ]
    }
  ]
}

function App() {
  const [currentView, setCurrentView] = useState('home') // 'home', 'categories', 'category', 'recipe'
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId)
    setCurrentView('category')
  }

  const handleGetCooking = () => {
    setCurrentView('categories')
  }

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe)
    setCurrentView('recipe')
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setSelectedCategory(null)
    setSelectedRecipe(null)
  }

  const handleBackToCategory = () => {
    setCurrentView('category')
    setSelectedRecipe(null)
  }

  const currentRecipes = selectedCategory ? recipes[selectedCategory] || [] : []

  return (
    <div className="app">
      {currentView === 'home' && (
        <div className="homepage-split">
          <div className="home-left">
            <div className="home-content">
              <h1 className="main-title">
                <span>Savor Every Bite</span>
                <span>with Sasi's</span>
                <span>Recipes</span>
              </h1>
              <p className="home-description">
                These recipes are easy to follow, beginner friendly, and made with simple ingredients you already know. Whether you are learning to cook or just want reliable home food, you will find dishes that actually work and taste like home.
              </p>
              <button className="get-cooking-button" onClick={handleGetCooking}>
                <span>Get Cooking</span>
              </button>
            </div>
          </div>
          <div className="divider-line"></div>
          <div className="home-right">
            <div className="food-photography">
              <div className="food-item main-frame">
                <img 
                  src="/images/main_frame.png" 
                  alt="Main frame" 
                  className="food-image main-frame-image"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {(currentView === 'categories' || currentView === 'category' || currentView === 'recipe') && (
        <header className={`header ${currentView === 'categories' || currentView === 'category' ? 'header-categories' : ''}`}>
          {currentView === 'categories' && (
            <button className="header-back-button" onClick={handleBackToHome} title="Back to Home">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
          )}
          {currentView === 'category' && (
            <button className="header-back-button" onClick={() => setCurrentView('categories')} title="Back to Categories">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
          )}
          {currentView === 'recipe' && selectedRecipe && (
            <button className="header-back-button" onClick={handleBackToCategory} title={`Back to ${categories.find(c => c.id === selectedRecipe.category)?.name}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
          )}
          {(currentView === 'categories' || currentView === 'category') ? (
            <h1 className="header-title-categories">Sasi's recipe book</h1>
          ) : (
            <>
              <h1>
                Sasi's South Indian Recipe Book
              </h1>
              <p>Authentic recipes from the heart of South India</p>
            </>
          )}
        </header>
      )}

      <main className={`main-content ${currentView === 'categories' || currentView === 'category' ? 'full-width' : ''}`}>
        {currentView === 'categories' && (
          <div className="categories-view">
            <div className="category-magazine-layout">
              {categories.map((category, index) => {
                const categoryImage = category.id === 'breakfast' ? '/images/chutneys_category_image.png' :
                  category.id === 'lunch' ? '/images/sweets_category_image.png' :
                  category.id === 'dinner' ? '/images/sabzi_image.png' :
                  '/images/main_gravies_category_image.png'
                
                return (
                  <div
                    key={category.id}
                    className={`magazine-category-section category-${index + 1}`}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <div className="magazine-image-container">
                      <img
                        src={categoryImage}
                        alt={category.name}
                        className="magazine-category-image"
                      />
                    </div>
                    <div className="magazine-text-block">
                      <h2 className="magazine-category-title">{category.name}</h2>
                      <p className="magazine-category-description">{category.description}</p>
                    </div>
                    <div className="magazine-vertical-label">{category.name}</div>
                  </div>
                )
              })}
              <div className="magazine-info-strip" style={{ display: 'flex', visibility: 'visible', opacity: 1 }}>
                <div className="info-strip-content">
                  <p className="info-strip-quote">Where simplicity becomes flavour.</p>
                  <h3 className="info-strip-title">South Indian Cuisine</h3>
                  <p className="info-strip-text">
                    A rich tapestry of flavors, South Indian food celebrates the harmony of spices, 
                    grains, and fresh ingredients. From the tangy chutneys that awaken the palate 
                    to the sweet treats that mark celebrations, each dish tells a story of tradition 
                    and home.
                  </p>
                  <p className="info-strip-text">
                    Rooted in centuries of culinary wisdom, these recipes have been passed down 
                    through generations, preserving the authentic taste of South India in every bite.
                  </p>
                </div>
              </div>
              <div className="magazine-info-strip-right" style={{ display: 'flex', visibility: 'visible', opacity: 1 }}>
                <div className="info-strip-content">
                  <p className="info-strip-text">
                    Sweets hold a special place in South Indian culture, crafted with love using time-honored recipes.
                  </p>
                  <p className="info-strip-text">
                    From festive laddus to quiet evening treats, sweets mark moments both big and small. They are offerings, celebrations, and memories passed gently from one generation to the next.
                  </p>
                  <p className="info-strip-quote">A balanced diet is a sweet in each hand.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'category' && (
          <div className="category-view">
            <div className="category-page-container">
              {/* Main Content Section */}
              <div className="category-main-layout">
                {/* Left Content */}
                <div className="category-main-content">
                  {/* Hero Section - Magazine Style */}
                  <div className="category-hero-section-magazine">
                    {/* Image and Title Row */}
                    <div className="category-hero-content-magazine">
                      {/* Left: Hero Image with Text Overlays (60%) */}
                      <div className="category-hero-image-magazine" data-category={selectedCategory}>
                        <img 
                          src={selectedCategory === 'breakfast' ? '/images/chutneys_category_image.png' :
                               selectedCategory === 'lunch' ? '/images/sweets_category_image.png' :
                               selectedCategory === 'dinner' ? '/images/sabzi_image.png' :
                               '/images/main_gravies_category_image.png'}
                          alt={categories.find(c => c.id === selectedCategory)?.name}
                          className="category-hero-img-magazine"
                        />
                        {/* Magazine-style text overlays */}
                        <div className="magazine-overlay-content">
                          <div className="magazine-overlay-center">
                            <h2 className="magazine-main-title">
                              {selectedCategory === 'breakfast' ? 'MOOD' :
                               selectedCategory === 'lunch' ? 'SWEET' :
                               selectedCategory === 'dinner' ? 'SABZI' :
                               'SNACKS'}
                            </h2>
                            <h3 className="magazine-subtitle">
                              {selectedCategory === 'breakfast' ? 'CHUTNEYS' :
                               selectedCategory === 'lunch' ? 'CELEBRATIONS' :
                               selectedCategory === 'dinner' ? 'HARMONY' :
                               'DELIGHTS'}
                            </h3>
                          </div>
                          <div className="magazine-overlay-bottom-left">
                            <h4 className="magazine-feature-title">new luxury</h4>
                            <p className="magazine-feature-text">
                              {selectedCategory === 'breakfast' ? 'A quiet ode to the side dishes that make every idli, dosa, and evening tiffin sing.' :
                               selectedCategory === 'lunch' ? 'Celebrations wrapped in sweetness, where tradition meets the warmth of home.' :
                               selectedCategory === 'dinner' ? 'The heart of South Indian vegetarian cuisine, where fresh vegetables meet aromatic spices.' :
                               'Crispy, flavorful, and perfectly spiced - the snacks that make every tea time special.'}
                            </p>
                          </div>
                          <div className="magazine-overlay-bottom-right">
                            <h4 className="magazine-brand-title">RECIPES</h4>
                            <p className="magazine-brand-text">
                              {selectedCategory === 'breakfast' ? 'From coconut and coriander to tomato and gongura, all pounded slow on ammikal.' :
                               selectedCategory === 'lunch' ? 'From creamy payasams to crumbly laddus, each sweet tells a story of festivals and family.' :
                               selectedCategory === 'dinner' ? 'Each dish celebrates the harmony of flavors, from dry stir-fries to rich, comforting gravies.' :
                               'From morning vadas to evening mixture, these treats bring people together.'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right: Title and Card (60%) */}
                      <div className="category-hero-text-magazine">
                        <h1 className="category-page-title-magazine">
                          {selectedCategory === 'breakfast' ? 'Stone-Ground Chutneys of the South' :
                           selectedCategory === 'lunch' ? 'Traditional Sweets of South India' :
                           selectedCategory === 'dinner' ? 'Vegetable Curries & Sabzis' :
                           'Crispy Snacks & Delights'}
                        </h1>
                        
                        {/* White Card below title */}
                        <div className="sidebar-callout">
                          <h3 className="callout-title">
                            {selectedCategory === 'breakfast' ? 'What makes a chutney "authentically" South Indian?' :
                             selectedCategory === 'lunch' ? 'What makes sweets special in South Indian culture?' :
                             selectedCategory === 'dinner' ? 'What defines authentic South Indian sabzis?' :
                             'What makes South Indian snacks unique?'}
                          </h3>
                          <p className="callout-text">
                            {selectedCategory === 'breakfast' ? 'Freshly scraped coconut, roasted lentils, a tempering of mustard and curry leaves in gingelly oil, and the rhythm of hands on stone. Each family guards its own ratios, but the soul is always the same.' :
                             selectedCategory === 'lunch' ? 'Jaggery instead of sugar, fresh coconut, ghee, and the patience of slow cooking. Each sweet carries the warmth of celebrations, the sweetness of traditions, and the love of generations.' :
                             selectedCategory === 'dinner' ? 'Fresh vegetables, mustard seeds popping in hot oil, curry leaves releasing their aroma, and the perfect balance of spices. Each dish respects the vegetable while creating layers of flavor.' :
                             'Crispy textures, bold spices, and the perfect balance of flavors. Made with rice flour, lentils, and traditional techniques that create that signature crunch and taste.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recipe Cards Section */}
                  <div id="recipes-section" className="recipe-cards-section">
                    <div className="recipe-section-header">
                      <div>
                        <h2 className="recipe-section-title">House-favourite {categories.find(c => c.id === selectedCategory)?.name.toLowerCase()}</h2>
                        <p className="recipe-section-description">Discover authentic flavors and time-honored traditions in every recipe.</p>
                      </div>
                    </div>
                    <div className="recipe-cards-grid-new">
                      {currentRecipes.map(recipe => {
                        let totalTime = recipe.cookTime
                        if (recipe.prepTime.includes('hours')) {
                          const hours = recipe.prepTime.match(/(\d+)\s*hours?/)?.[1] || '8'
                          totalTime = `${hours} hrs`
                        } else {
                          const cookTimeNum = parseInt(recipe.cookTime) || 0
                          if (cookTimeNum >= 60) {
                            totalTime = `${Math.floor(cookTimeNum / 60)} hr`
                          } else {
                            totalTime = `${cookTimeNum} mins`
                          }
                        }
                        const difficulty = recipe.prepTime.includes('hours') ? 'Hard' : 
                          (parseInt(recipe.cookTime) || 0) < 20 ? 'Easy' : 'Medium'
                        const categoryImage = selectedCategory === 'breakfast' ? '/images/chutneys_category_image.png' :
                          selectedCategory === 'lunch' ? '/images/sweets_category_image.png' :
                          selectedCategory === 'dinner' ? '/images/sabzi_image.png' :
                          '/images/main_gravies_category_image.png'
                        return (
                          <div
                            key={recipe.id}
                            className="recipe-card-new"
                            onClick={() => handleRecipeClick(recipe)}
                          >
                            <div className="recipe-card-image-new">
                              <img
                                src={categoryImage}
                                alt={recipe.title}
                                className="recipe-card-img-new"
                              />
                            </div>
                            <div className="recipe-card-content-new">
                              <h3 className="recipe-card-title-new">{recipe.title}</h3>
                              <p className="recipe-card-desc-new">{recipe.description}</p>
                              <div className="recipe-card-meta-new">
                                <span className="recipe-time-new">{totalTime}</span>
                                {selectedCategory === 'breakfast' && (
                                  <span className="recipe-tag-new">{difficulty === 'Hard' ? 'Family heirloom' : difficulty === 'Easy' ? 'Quick weekday' : 'Herb rich'}</span>
                                )}
                                {selectedCategory === 'lunch' && (
                                  <span className="recipe-tag-new">{difficulty === 'Hard' ? 'Festive' : 'Traditional'}</span>
                                )}
                                {selectedCategory === 'dinner' && (
                                  <span className="recipe-tag-new">{difficulty === 'Hard' ? 'Special occasion' : 'Everyday'}</span>
                                )}
                                {selectedCategory === 'snacks' && (
                                  <span className="recipe-tag-new">{difficulty === 'Hard' ? 'Festive' : 'Quick'}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {currentView === 'recipe' && selectedRecipe && (
          <RecipeDetail recipe={selectedRecipe} />
        )}
      </main>

    </div>
  )
}

export default App
