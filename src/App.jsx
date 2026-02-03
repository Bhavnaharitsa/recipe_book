import { useState } from 'react'
import './App.css'

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
    name: 'Snacks',
    icon: '🍿',
    description: 'Crispy and delicious South Indian snacks',
    color: '#FFD700'
  },
  {
    id: 'desserts',
    name: 'Desserts',
    icon: '🍰',
    description: 'Sweet treats and traditional desserts',
    color: '#FF69B4'
  },
  {
    id: 'beverages',
    name: 'Beverages',
    icon: '☕',
    description: 'Refreshing drinks and traditional beverages',
    color: '#4A90E2'
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
            <button className="quick-edit-button">
              <span className="pencil-icon">✏️</span>
              Quick Edit
            </button>
            <div className="home-content">
              <h1 className="main-title">
                <span>Savor Every Bite</span>
                <span>with Sasi's</span>
                <span>Recipes</span>
              </h1>
              <p className="home-subtitle">
                Welcome to Sasi's Recipe, where we share delightful culinary creations daily
              </p>
              <button className="get-cooking-button" onClick={handleGetCooking}>
                Get Cooking
              </button>
            </div>
          </div>
          <div className="divider-line"></div>
          <div className="home-right">
            <div className="food-photography">
              <div className="food-item large">
                <div className="food-placeholder large-food"></div>
              </div>
              <div className="food-item small">
                <div className="food-placeholder small-food"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {(currentView === 'categories' || currentView === 'category' || currentView === 'recipe') && (
        <header className="header">
          {currentView === 'categories' && (
            <button className="header-back-button" onClick={handleBackToHome} title="Back to Home">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
          )}
          {currentView === 'category' && (
            <button className="header-back-button" onClick={() => setCurrentView('categories')} title="Back to Categories">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
          <h1>
            Sasi's South Indian Recipe Book
          </h1>
          <p>Authentic recipes from the heart of South India</p>
        </header>
      )}

      <main className={`main-content ${currentView === 'categories' ? 'full-width' : ''}`}>
        {currentView === 'categories' && (
          <div className="categories-view">
            <div className="category-grid">
              {categories.map(category => (
                <div
                  key={category.id}
                  className="category-card"
                  onClick={() => handleCategoryClick(category.id)}
                  style={{ '--category-color': category.color }}
                >
                  <div className="category-icon">{category.icon}</div>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <div className="category-count">
                    {recipes[category.id]?.length || 0} recipes
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'category' && (
          <div className="category-view">
            <h2 className="section-title">
              {categories.find(c => c.id === selectedCategory)?.icon}{' '}
              {categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <div className="recipe-grid">
              {currentRecipes.map(recipe => (
                <div
                  key={recipe.id}
                  className="recipe-card"
                  onClick={() => handleRecipeClick(recipe)}
                >
                  <h3>{recipe.title}</h3>
                  <p className="recipe-description">{recipe.description}</p>
                  <div className="recipe-meta">
                    <span>⏱️ {recipe.prepTime}</span>
                    <span>🔥 {recipe.cookTime}</span>
                    <span>👥 {recipe.servings} servings</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'recipe' && selectedRecipe && (
          <div className="recipe-detail">
            <h1>{selectedRecipe.title}</h1>
            <p className="recipe-description">{selectedRecipe.description}</p>
            
            <div className="recipe-info">
              <div className="info-item">
                <strong>Prep Time:</strong> {selectedRecipe.prepTime}
              </div>
              <div className="info-item">
                <strong>Cook Time:</strong> {selectedRecipe.cookTime}
              </div>
              <div className="info-item">
                <strong>Servings:</strong> {selectedRecipe.servings}
              </div>
            </div>

            <div className="recipe-section">
              <h2>Ingredients</h2>
              <ul className="ingredients-list">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="recipe-section">
              <h2>Instructions</h2>
              <ol className="instructions-list">
                {selectedRecipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </main>

      {currentView !== 'home' && (
        <footer className="footer">
          <p>Made with ❤️ for South Indian food lovers</p>
        </footer>
      )}
    </div>
  )
}

export default App
