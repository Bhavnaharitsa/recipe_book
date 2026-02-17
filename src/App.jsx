import { useState, useEffect, useRef } from 'react'
import './App.css'

function RecipeDetail({ recipe, recipes, handleRecipeClick, handleViewAllRecipes }) {
  const [showChecklist, setShowChecklist] = useState(false)
  const [checkedIngredients, setCheckedIngredients] = useState({})
  const [checkedSteps, setCheckedSteps] = useState({})
  const [activeTab, setActiveTab] = useState('ingredients')

  // Get the correct image for the recipe
  const getRecipeImage = () => {
    if (recipe.category === 'breakfast') {
      if (recipe.title.toLowerCase().includes('coconut chutney')) {
        return '/images/coconut_chutney.png'
      } else if (recipe.title.toLowerCase().includes('tomato chutney')) {
        return '/images/red_tomato_chutney.png'
      } else if (recipe.title.toLowerCase().includes('coriander chutney')) {
        return '/images/green_chutney.png'
      } else if (recipe.title.toLowerCase().includes('peanut chutney')) {
        return '/images/peanut_chutney.png'
      }
      return '/images/chutneys_category_image.png'
    } else if (recipe.category === 'lunch') {
      if (recipe.title.toLowerCase().includes('ashoka halwa')) {
        return '/images/ashoka_halwa.png'
      } else if (recipe.title.toLowerCase().includes('puran poli')) {
        return '/images/puran_poli.png'
      } else if (recipe.title.toLowerCase().includes('modhak')) {
        return '/images/modhuka.png'
      } else if (recipe.title.toLowerCase().includes('payasam')) {
        return '/images/rice_payasam.png'
      }
      return '/images/sweets_category_image.png'
    } else if (recipe.category === 'dinner') {
      if (recipe.title.toLowerCase().includes('carrot')) {
        return '/images/carrot_sabzi.png'
      } else if (recipe.title.toLowerCase().includes('beetroot')) {
        return '/images/beetroot_sabzi.png'
      } else if (recipe.title.toLowerCase().includes('aloo')) {
        return '/images/aalo_sabzi.png'
      } else if (recipe.title.toLowerCase().includes('mix veg')) {
        return '/images/mix_veg_sabzi.png'
      } else if (recipe.title.toLowerCase().includes('vangi') || recipe.title.toLowerCase().includes('brinjal')) {
        return '/images/brinjal_sabzi.png'
      } else if (recipe.title.toLowerCase().includes('bhindi')) {
        return '/images/bhindi_sabzi.png'
      } else if (recipe.title.toLowerCase().includes('beans')) {
        return '/images/beans_sabzi.png'
      }
      return '/images/sabzi_image.png'
    } else if (recipe.category === 'snacks') {
      if (recipe.title.toLowerCase().includes('rasam')) {
        return '/images/rasam.png'
      } else if (recipe.title.toLowerCase().includes('ponni sambar')) {
        return '/images/ponni_sambar.png'
      } else if (recipe.title.toLowerCase().includes('metho sambar') || recipe.title.toLowerCase().includes('methi sambar')) {
        return '/images/methi_sambar.png'
      } else if (recipe.title.toLowerCase().includes('sambar')) {
        return '/images/sambar.png'
      } else if (recipe.title.toLowerCase().includes('aviyal')) {
        return '/images/aviyal.png'
      } else if (recipe.title.toLowerCase().includes('bisi belle') || recipe.title.toLowerCase().includes('bisi bella')) {
        return '/images/bisi_belle.png'
      } else if (recipe.title.toLowerCase().includes('tamarind pulusu') || recipe.title.toLowerCase().includes('pulusu')) {
        return '/images/tamarind_pulusu.png'
      }
      return '/images/main_gravies_category_image.png'
    } else if (recipe.category === 'quick-foods') {
      // Use a default quick foods image or category image
      return '/images/chutneys_category_image.png'
    }
    return '/images/main_gravies_category_image.png'
  }

  const categoryImage = getRecipeImage()

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
    snacks: 'MAIN GRAVIES',
    'quick-foods': 'QUICK FOODS'
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
    const groups = []
    let currentGroup = { title: null, items: [] }
    
    recipe.instructions.forEach((instruction) => {
      // Check if instruction is a title (short, contains common cooking verbs, or ends with colon)
      const isTitle = instruction.length < 50 && (
        instruction.match(/^(Cook|Prepare|Boil|Simmer|Temper|Fry|Roast|Grind|Mix|Add|Heat|Serve)/i) ||
        instruction.endsWith(':') ||
        instruction.match(/^[A-Z][a-z]+(\s+[A-Z][a-z]+)*\s+(the|a|an)\s+/i)
      )
      
      if (isTitle) {
        // If we have items in current group, save it
        if (currentGroup.items.length > 0) {
          groups.push(currentGroup)
        }
        // Start new group with this title
        currentGroup = { 
          title: instruction.replace(':', '').trim(), 
          items: [] 
        }
      } else {
        // Add instruction to current group
        currentGroup.items.push(instruction)
      }
    })
    
    // Add the last group
    if (currentGroup.items.length > 0 || currentGroup.title) {
      groups.push(currentGroup)
    }
    
    return groups.length > 0 ? groups : [{ title: null, items: recipe.instructions }]
  }

  const instructionGroups = groupInstructions()

  // Get related recipes for "Complete the Meal" section
  const getRelatedRecipes = () => {
    const allRecipes = [
      ...(recipes.breakfast || []),
      ...(recipes.lunch || []),
      ...(recipes.dinner || []),
      ...(recipes.snacks || []),
      ...(recipes['quick-foods'] || [])
    ]
    // Filter out current recipe and get 3 related recipes
    return allRecipes
      .filter(r => r.id !== recipe.id)
      .slice(0, 3)
  }

  const relatedRecipes = getRelatedRecipes()

  // Get all ingredients as a flat list for checklist
  const getAllIngredients = () => {
    const all = []
    ingredientGroups.forEach(group => {
      group.items.forEach(item => {
        if (!item.includes(':')) {
          all.push(item)
        }
      })
    })
    return all
  }

  const allIngredients = getAllIngredients()

  // Toggle ingredient checkbox
  const toggleIngredient = (index) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  // Toggle step checkbox
  const toggleStep = (index) => {
    setCheckedSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  // Generate witty checklist title based on recipe
  const getChecklistTitle = () => {
    const title = recipe.title.toLowerCase()
    const wittyTitles = [
      "Let's Get Cooking!",
      "Time to Cook!",
      "Your Cooking Adventure",
      "Ready, Set, Cook!",
      "Let's Make Magic!",
      "Cooking Time!",
      "Your Recipe Roadmap",
      "Let's Create Something Delicious!",
      "Step by Step to Deliciousness",
      "Your Cooking Checklist"
    ]
    
    // Recipe-specific witty titles
    if (title.includes('halwa')) {
      return "Sweet Success Checklist"
    } else if (title.includes('sambar') || title.includes('rasam') || title.includes('pulusu')) {
      return "Spice It Up Checklist"
    } else if (title.includes('sabzi') || title.includes('vegetable')) {
      return "Veggie Victory Checklist"
    } else if (title.includes('chutney')) {
      return "Dip & Delight Checklist"
    } else if (title.includes('poli') || title.includes('roti')) {
      return "Roll It Right Checklist"
    } else if (title.includes('vada') || title.includes('bonda')) {
      return "Crispy Creation Checklist"
    } else if (title.includes('payasam') || title.includes('kheer')) {
      return "Sweet Dreams Checklist"
    }
    
    // Return a random witty title
    return wittyTitles[Math.floor(Math.random() * wittyTitles.length)]
  }

  // Get time display for related recipes
  const getTimeDisplay = (recipe) => {
    if (recipe.prepTime?.includes('hours')) {
      const hours = recipe.prepTime.match(/(\d+)\s*hours?/)?.[1] || '8'
      return `${hours} hrs (ferment)`
    }
    return recipe.cookTime || 'N/A'
  }

  // Get difficulty for related recipes
  const getDifficultyDisplay = (recipe) => {
    const prepHours = recipe.prepTime?.match(/(\d+)\s*hours?/i)?.[1] || 0
    const cookMins = parseInt(recipe.cookTime?.match(/(\d+)\s*min/i)?.[1] || 0)
    if (prepHours > 0 || cookMins > 45) return 'Hard'
    if (cookMins > 25) return 'Medium'
    return 'Easy'
  }

  // Get image for related recipes (special images for specific chutneys)
  const getCategoryImage = (relatedRecipe) => {
    if (relatedRecipe.category === 'breakfast') {
      if (relatedRecipe.title.toLowerCase().includes('coconut chutney')) {
        return '/images/coconut_chutney.png'
      } else if (relatedRecipe.title.toLowerCase().includes('tomato chutney')) {
        return '/images/red_tomato_chutney.png'
      } else if (relatedRecipe.title.toLowerCase().includes('coriander chutney')) {
        return '/images/green_chutney.png'
      } else if (relatedRecipe.title.toLowerCase().includes('peanut chutney')) {
        return '/images/peanut_chutney.png'
      }
      return '/images/chutneys_category_image.png'
    } else if (relatedRecipe.category === 'lunch') {
      if (relatedRecipe.title.toLowerCase().includes('ashoka halwa')) {
        return '/images/ashoka_halwa.png'
      } else if (relatedRecipe.title.toLowerCase().includes('puran poli')) {
        return '/images/puran_poli.png'
      } else if (relatedRecipe.title.toLowerCase().includes('modhak')) {
        return '/images/modhak.png'
      } else if (relatedRecipe.title.toLowerCase().includes('payasam')) {
        return '/images/payasam.png'
      }
      return '/images/sweets_category_image.png'
    } else if (relatedRecipe.category === 'dinner') {
      if (relatedRecipe.title.toLowerCase().includes('carrot')) {
        return '/images/carrot_sabzi.png'
      } else if (relatedRecipe.title.toLowerCase().includes('beetroot')) {
        return '/images/beetroot_sabzi.png'
      } else if (relatedRecipe.title.toLowerCase().includes('aloo')) {
        return '/images/aalo_sabzi.png'
      } else if (relatedRecipe.title.toLowerCase().includes('mix veg')) {
        return '/images/mix_veg_sabzi.png'
      } else if (relatedRecipe.title.toLowerCase().includes('vangi') || relatedRecipe.title.toLowerCase().includes('brinjal')) {
        return '/images/brinjal_sabzi.png'
      } else if (relatedRecipe.title.toLowerCase().includes('bhindi')) {
        return '/images/bhindi_sabzi.png'
      } else if (relatedRecipe.title.toLowerCase().includes('beans')) {
        return '/images/beans_sabzi.png'
      }
      return '/images/sabzi_image.png'
    } else if (relatedRecipe.category === 'snacks') {
      if (relatedRecipe.title.toLowerCase().includes('rasam')) {
        return '/images/rasam.png'
      } else if (relatedRecipe.title.toLowerCase().includes('ponni sambar')) {
        return '/images/ponni_sambar.png'
      } else if (relatedRecipe.title.toLowerCase().includes('metho sambar') || relatedRecipe.title.toLowerCase().includes('methi sambar')) {
        return '/images/methi_sambar.png'
      } else if (relatedRecipe.title.toLowerCase().includes('sambar')) {
        return '/images/sambar.png'
      } else if (relatedRecipe.title.toLowerCase().includes('aviyal')) {
        return '/images/aviyal.png'
      } else if (relatedRecipe.title.toLowerCase().includes('bisi belle') || relatedRecipe.title.toLowerCase().includes('bisi bella')) {
        return '/images/bisi_belle.png'
      } else if (relatedRecipe.title.toLowerCase().includes('tamarind pulusu') || relatedRecipe.title.toLowerCase().includes('pulusu')) {
        return '/images/tamarind_pulusu.png'
      }
      return '/images/main_gravies_category_image.png'
    } else if (relatedRecipe.category === 'quick-foods') {
      // Use a default quick foods image or category image
      return '/images/chutneys_category_image.png'
    }
    return '/images/main_gravies_category_image.png'
  }

  return (
    <div className="recipe-detail-new-container">
      {/* Header Section */}
      <div className="recipe-detail-new-header">
        <h1 className="recipe-detail-new-title">{recipe.title}</h1>
        <p className="recipe-detail-new-description">{recipe.description}</p>
      </div>

      {/* Checklist Modal/Section */}
      {showChecklist && (
        <div 
          className="recipe-checklist-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowChecklist(false);
            }
          }}
        >
          <div 
            className="recipe-checklist-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="checklist-header">
              <h2>Cooking Checklist</h2>
              <button 
                className="checklist-close"
                onClick={() => setShowChecklist(false)}
              >
                ×
              </button>
            </div>
            
            <div className="checklist-content">
              {/* Ingredients Checklist */}
              <div className="checklist-section">
                <h3 className="checklist-section-title">Ingredients</h3>
                <ul className="checklist-items">
                  {allIngredients.map((ingredient, index) => (
                    <li key={index} className="checklist-item">
                      <label className="checklist-label">
                        <input
                          type="checkbox"
                          checked={checkedIngredients[index] || false}
                          onChange={() => toggleIngredient(index)}
                          className="checklist-checkbox"
                        />
                        <span className={checkedIngredients[index] ? 'checked' : ''}>
                          {ingredient}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps Checklist */}
              <div className="checklist-section">
                <h3 className="checklist-section-title">Recipe Steps</h3>
                <ol className="checklist-items checklist-steps">
                  {recipe.instructions.map((step, index) => (
                    <li key={index} className="checklist-item">
                      <label className="checklist-label">
                        <input
                          type="checkbox"
                          checked={checkedSteps[index] || false}
                          onChange={() => toggleStep(index)}
                          className="checklist-checkbox"
                        />
                        <span className={checkedSteps[index] ? 'checked' : ''}>
                          {step}
                        </span>
                      </label>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Image at Top */}
      <div className="recipe-detail-main-image-container">
        <img 
          src={categoryImage} 
          alt={recipe.title}
          className="recipe-detail-main-image"
        />
      </div>

      {/* Tab View: Ingredients and Instructions */}
      <div className="recipe-tab-container">
        <div className="recipe-tab-buttons">
          <button 
            className={`recipe-tab-button ${activeTab === 'ingredients' ? 'active' : ''}`}
            onClick={() => setActiveTab('ingredients')}
          >
            <img src="/images/ingredients_icon.png" alt="Ingredients" className="tab-icon" />
            Ingredients
          </button>
          <button 
            className={`recipe-tab-button ${activeTab === 'instructions' ? 'active' : ''}`}
            onClick={() => setActiveTab('instructions')}
          >
            <img src="/images/instructions_icon.png" alt="Instructions" className="tab-icon" />
            Instructions
          </button>
        </div>

        <div className="recipe-tab-content">
          {activeTab === 'ingredients' && (
            <div className="recipe-tab-panel">
              {ingredientGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="ingredient-group">
                  {group.title && (
                    <h3 className="ingredient-group-title">{group.title}</h3>
                  )}
                  <ul className="ingredients-list-new">
                    {group.items.map((ingredient, index) => {
                      // Parse quantity and ingredient name
                      const match = ingredient.match(/^([\d\/\s\.]+[a-z]*)\s+(.+)$/i);
                      if (match) {
                        const [, quantity, name] = match;
                        return (
                          <li key={index}>
                            <span className="ingredient-quantity">{quantity}</span>
                            <span className="ingredient-name"> {name}</span>
                          </li>
                        );
                      }
                      return <li key={index}>{ingredient}</li>;
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'instructions' && (
            <div className="recipe-tab-panel">
              {instructionGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="instruction-group">
                  {group.title && (
                    <h3 className="instruction-group-title">{group.title}</h3>
                  )}
                  <div className="instructions-paragraph">
                    {group.items.map((instruction, index) => (
                      <p key={index} className="instruction-text">{instruction}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Do This Recipe Now Button - placed after lists */}
      <div className="recipe-action-section">
        <button 
          className="do-recipe-now-button"
          onClick={() => setShowChecklist(!showChecklist)}
        >
          {showChecklist ? 'Hide Checklist' : 'Start Cooking'}
        </button>
      </div>

      {/* Complete the Meal Section */}
      <div className="complete-meal-section">
        <div className="complete-meal-section-inner">
          <div className="complete-meal-header">
            <div className="complete-meal-title-section">
              <h2 className="complete-meal-title">Complete the Meal</h2>
              <p className="complete-meal-subtitle">Authentic pairings perfect for this dish.</p>
            </div>
            <button className="view-all-recipes-button" onClick={handleViewAllRecipes}>View All Recipes</button>
          </div>
          <div className="complete-meal-cards">
            {relatedRecipes.map((relatedRecipe) => (
              <div
                key={relatedRecipe.id}
                className="complete-meal-card"
                onClick={() => handleRecipeClick(relatedRecipe)}
              >
                <div className="complete-meal-card-image">
                  <img
                    src={getCategoryImage(relatedRecipe)}
                    alt={relatedRecipe.title}
                  />
                </div>
                <div className="complete-meal-card-content">
                  <h3 className="complete-meal-card-title">{relatedRecipe.title}</h3>
                  <div className="complete-meal-card-meta">
                    <span className="complete-meal-card-time">
                      <span className="time-icon">🕐</span>
                      {getTimeDisplay(relatedRecipe)}
                    </span>
                    <span className={`complete-meal-card-difficulty difficulty-${getDifficultyDisplay(relatedRecipe).toLowerCase()}`}>
                      {getDifficultyDisplay(relatedRecipe)}
                    </span>
                    <span className="complete-meal-card-arrow">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
  },
  {
    id: 'quick-foods',
    name: '15mins Quick Fun Foods',
    icon: '⚡',
    description: 'Easy and quick recipes ready in 15 minutes or less',
    color: '#FF6B9D'
  }
]

const recipes = {
  breakfast: [
    {
      id: 1,
      title: 'Fresh Coconut Chutney',
      description: 'Creamy coconut chutney with roasted dal and a fragrant tempering',
      prepTime: '10 min',
      cookTime: '10 min',
      servings: 4,
      category: 'breakfast',
      ingredients: [
        '1 cup fresh grated coconut',
        '2 tbsp roasted chana dal (dalia)',
        '2 green chilies',
        '1 small piece ginger',
        'Salt to taste',
        'Water as needed',
        'For Tempering:',
        '1 tsp mustard seeds',
        '1 tsp urad dal',
        '2 dried red chilies',
        '8-10 curry leaves',
        '1 tbsp coconut oil or gingelly oil'
      ],
      instructions: [
        'In a mixer jar, add grated coconut, roasted chana dal, green chilies, ginger, salt, and a little water.',
        'Grind to a smooth or slightly coarse chutney, adding water as needed for desired consistency.',
        'Transfer the chutney to a serving bowl.',
        'For tempering, heat oil in a small pan.',
        'Add mustard seeds and let them splutter.',
        'Add urad dal and fry until golden.',
        'Add dried red chilies and curry leaves; sauté for a few seconds.',
        'Pour the tempering over the chutney and mix gently.',
        'Serve immediately with idli, dosa, or pongal.'
      ]
    },
    {
      id: 2,
      title: 'Tomato Chutney',
      description: 'Tangy and spicy tomato chutney with a perfect balance of flavors',
      prepTime: '5 min',
      cookTime: '15 min',
      servings: 4,
      category: 'breakfast',
      ingredients: [
        '4 large ripe tomatoes',
        '2 dried red chilies',
        '1 tsp urad dal',
        '1 tsp chana dal',
        '1/2 tsp mustard seeds',
        '1/2 tsp cumin seeds',
        '1/4 tsp asafoetida (hing)',
        '8-10 curry leaves',
        '2 tbsp oil',
        'Salt to taste',
        '1 tsp jaggery (optional)',
        'Coriander leaves for garnish'
      ],
      instructions: [
        'Heat oil in a pan, add urad dal and chana dal.',
        'Fry until golden, then add dried red chilies.',
        'Add mustard seeds and let them splutter.',
        'Add cumin seeds, asafoetida, and curry leaves.',
        'Add chopped tomatoes and salt.',
        'Cook until tomatoes are soft and mushy.',
        'Let it cool, then grind to a smooth paste.',
        'Add jaggery if using, mix well.',
        'Garnish with coriander leaves.',
        'Serve with idli, dosa, or pongal.'
      ]
    },
    {
      id: 3,
      title: 'Coriander Chutney',
      description: 'Fresh and vibrant green chutney with coriander and mint',
      prepTime: '5 min',
      cookTime: '5 min',
      servings: 4,
      category: 'breakfast',
      ingredients: [
        '1 cup fresh coriander leaves',
        '1/2 cup fresh mint leaves',
        '2 green chilies',
        '1 small piece ginger',
        '1 tbsp roasted chana dal',
        '1 tsp lemon juice',
        'Salt to taste',
        'Water as needed',
        'For Tempering:',
        '1 tsp mustard seeds',
        '1 tsp urad dal',
        '2 dried red chilies',
        '8-10 curry leaves',
        '1 tbsp oil'
      ],
      instructions: [
        'Wash coriander and mint leaves thoroughly.',
        'In a mixer jar, add coriander leaves, mint leaves, green chilies, ginger, roasted chana dal, lemon juice, salt, and a little water.',
        'Grind to a smooth paste, adding water as needed.',
        'Transfer to a serving bowl.',
        'For tempering, heat oil in a small pan.',
        'Add mustard seeds and let them splutter.',
        'Add urad dal and fry until golden.',
        'Add dried red chilies and curry leaves; sauté for a few seconds.',
        'Pour the tempering over the chutney and mix gently.',
        'Serve fresh with idli, dosa, or any South Indian breakfast.'
      ]
    },
    {
      id: 4,
      title: 'Peanut Chutney',
      description: 'Rich and nutty chutney with roasted peanuts and aromatic spices',
      prepTime: '5 min',
      cookTime: '10 min',
      servings: 4,
      category: 'breakfast',
      ingredients: [
        '1 cup roasted peanuts',
        '2 dried red chilies',
        '1 tsp urad dal',
        '1 tsp chana dal',
        '1/2 tsp mustard seeds',
        '1/2 tsp cumin seeds',
        '1/4 tsp asafoetida (hing)',
        '8-10 curry leaves',
        '2 tbsp oil',
        'Salt to taste',
        '1 tsp tamarind paste',
        'Water as needed',
        'Coriander leaves for garnish'
      ],
      instructions: [
        'Heat oil in a pan, add urad dal and chana dal.',
        'Fry until golden, then add dried red chilies.',
        'Add mustard seeds and let them splutter.',
        'Add cumin seeds, asafoetida, and curry leaves.',
        'Remove from heat and let it cool.',
        'In a mixer jar, add roasted peanuts, the tempering mixture, tamarind paste, salt, and a little water.',
        'Grind to a smooth or slightly coarse paste, adding water as needed.',
        'Transfer to a serving bowl.',
        'Garnish with coriander leaves.',
        'Serve with idli, dosa, or vada.'
      ]
    }
  ],
  lunch: [
    {
      id: 4,
      title: 'Ashoka Halwa',
      description: 'Rich, fudgy sweet made with moong dal and ghee',
      prepTime: '15 min',
      cookTime: '45 min',
      servings: 6,
      category: 'lunch',
      ingredients: [
        '1 cup yellow moong dal',
        '1.5 cups sugar',
        '1 cup ghee',
        '1/2 cup milk',
        '1/4 tsp cardamom powder',
        'Few strands of saffron (optional)',
        '2 tbsp cashews, chopped',
        '2 tbsp raisins'
      ],
      instructions: [
        'Dry roast moong dal until golden and aromatic',
        'Wash and pressure cook dal with 2 cups water for 3-4 whistles',
        'Mash the cooked dal until smooth',
        'Heat ghee in a heavy-bottomed pan',
        'Add the mashed dal and cook on medium heat',
        'Stir continuously until dal starts leaving the sides',
        'Add sugar and mix well',
        'Add milk gradually while stirring',
        'Add cardamom powder and saffron',
        'Continue cooking until halwa thickens and ghee separates',
        'Garnish with cashews and raisins',
        'Serve warm or at room temperature'
      ]
    },
    {
      id: 5,
      title: 'Puran Poli',
      description: 'Sweet flatbread stuffed with spiced lentil and jaggery filling',
      prepTime: '30 min',
      cookTime: '30 min',
      servings: 8,
      category: 'lunch',
      ingredients: [
        'For Dough:',
        '2 cups all-purpose flour (maida)',
        '1/4 tsp turmeric powder',
        '2 tbsp oil',
        'Salt to taste',
        'Water as needed',
        'For Filling:',
        '1 cup chana dal (split Bengal gram)',
        '1 cup jaggery, grated',
        '1/2 tsp cardamom powder',
        '1/4 tsp nutmeg powder',
        '2 tbsp ghee',
        'Oil or ghee for cooking'
      ],
      instructions: [
        'Soak chana dal for 2 hours, then pressure cook until soft',
        'Drain water and mash the dal',
        'Heat ghee, add mashed dal and jaggery',
        'Cook until mixture thickens and leaves the sides',
        'Add cardamom and nutmeg powder, mix well',
        'Let the filling cool completely',
        'For dough, mix flour, turmeric, salt, and oil',
        'Add water gradually and knead to soft dough',
        'Rest dough for 30 minutes',
        'Divide dough and filling into equal portions',
        'Roll dough, place filling, seal and roll into thin roti',
        'Cook on tawa with ghee until golden on both sides',
        'Serve hot with ghee or milk'
      ]
    },
    {
      id: 6,
      title: 'Modhak',
      description: 'Sweet dumplings filled with coconut and jaggery, steamed to perfection',
      prepTime: '20 min',
      cookTime: '20 min',
      servings: 12,
      category: 'lunch',
      ingredients: [
        'For Outer Cover:',
        '1 cup rice flour',
        '1.5 cups water',
        '1 tsp oil',
        'Pinch of salt',
        'For Filling:',
        '1 cup fresh grated coconut',
        '1 cup jaggery, grated',
        '1/2 tsp cardamom powder',
        '1 tbsp poppy seeds (optional)',
        '1 tbsp chopped cashews',
        '1 tbsp raisins'
      ],
      instructions: [
        'Heat water with oil and salt in a pan',
        'When water boils, add rice flour and mix quickly',
        'Cover and cook on low heat for 2 minutes',
        'Remove from heat and knead to smooth dough',
        'For filling, heat jaggery with 2 tbsp water',
        'Add grated coconut and cook until thick',
        'Add cardamom, poppy seeds, cashews, and raisins',
        'Mix well and let filling cool',
        'Take small portions of dough, flatten into disc',
        'Place filling in center, gather edges and seal',
        'Shape into modhak with pleats on top',
        'Steam in idli steamer for 12-15 minutes',
        'Serve hot with ghee'
      ]
    },
    {
      id: 7,
      title: 'Payasam',
      description: 'Creamy rice pudding with jaggery, cardamom, and nuts',
      prepTime: '10 min',
      cookTime: '30 min',
      servings: 6,
      category: 'lunch',
      ingredients: [
        '1/2 cup rice (preferably short grain)',
        '1 cup jaggery, grated',
        '4 cups milk',
        '1/2 cup coconut milk',
        '1/2 tsp cardamom powder',
        '2 tbsp ghee',
        '2 tbsp cashews, chopped',
        '2 tbsp raisins',
        'Few strands of saffron (optional)',
        '1 tsp rose water (optional)'
      ],
      instructions: [
        'Wash rice and soak for 30 minutes',
        'Heat ghee in a heavy-bottomed pan',
        'Add cashews and raisins, fry until golden',
        'Drain and set aside',
        'In the same pan, add drained rice',
        'Sauté for 2 minutes, then add milk',
        'Cook on medium heat until rice is soft',
        'Add jaggery and stir until dissolved',
        'Add coconut milk and mix well',
        'Add cardamom powder, saffron, and rose water',
        'Simmer for 5 minutes until creamy',
        'Garnish with fried cashews and raisins',
        'Serve warm or chilled'
      ]
    }
  ],
  dinner: [
    {
      id: 7,
      title: 'Carrot Sabzi',
      description: 'Lightly spiced carrot stir-fry with coconut and curry leaves',
      prepTime: '10 min',
      cookTime: '15 min',
      servings: 4,
      category: 'dinner',
      ingredients: [
        '3 cups carrots, finely chopped or sliced',
        '1 tbsp oil',
        '1 tsp mustard seeds',
        '1 tsp urad dal',
        '2 green chilies, slit',
        '8–10 curry leaves',
        '1/4 cup fresh grated coconut',
        '1/4 tsp turmeric powder',
        'Salt to taste',
        'Coriander leaves for garnish'
      ],
      instructions: [
        'Heat oil in a pan and add mustard seeds.',
        'When they splutter, add urad dal, green chilies, and curry leaves.',
        'Add chopped carrots, turmeric, and salt; mix well.',
        'Sprinkle a little water, cover, and cook until carrots are tender yet firm.',
        'Add grated coconut and sauté for 2–3 minutes.',
        'Garnish with coriander leaves and serve warm.'
      ]
    },
    {
      id: 8,
      title: 'Beetroot Sabzi',
      description: 'Sweet and earthy beetroot curry tempered with South Indian spices',
      prepTime: '10 min',
      cookTime: '20 min',
      servings: 4,
      category: 'dinner',
      ingredients: [
        '3 cups beetroot, finely chopped or grated',
        '1 tbsp oil',
        '1 tsp mustard seeds',
        '1 tsp urad dal',
        '2 dried red chilies',
        '8–10 curry leaves',
        '1/4 tsp turmeric powder',
        'Salt to taste',
        '1/4 cup fresh grated coconut'
      ],
      instructions: [
        'Heat oil in a pan and add mustard seeds.',
        'Once they splutter, add urad dal, dried red chilies, and curry leaves.',
        'Add beetroot, turmeric, and salt; mix well.',
        'Sprinkle some water, cover, and cook until beetroot is soft.',
        'Add grated coconut, sauté for 2 minutes, and switch off the heat.',
        'Serve as a side for rice or chapati.'
      ]
    },
    {
      id: 9,
      title: 'Aloo Sabzi',
      description: 'Comforting potato curry with mustard, curry leaves, and spices',
      prepTime: '10 min',
      cookTime: '20 min',
      servings: 4,
      category: 'dinner',
      ingredients: [
        '4 medium potatoes, boiled and cubed',
        '2 tbsp oil',
        '1 tsp mustard seeds',
        '1 tsp urad dal',
        '1 tsp chana dal',
        '2 green chilies, slit',
        '1 medium onion, sliced (optional)',
        '1/4 tsp turmeric powder',
        '1/2 tsp red chili powder',
        'Salt to taste',
        'Coriander leaves for garnish'
      ],
      instructions: [
        'Heat oil in a pan; add mustard seeds, urad dal, and chana dal.',
        'When they turn golden, add green chilies and onions (if using); sauté until soft.',
        'Add turmeric, red chili powder, and salt; mix quickly.',
        'Add boiled potato cubes and toss gently to coat with the masala.',
        'Cook for 5–7 minutes on low heat until edges turn slightly crisp.',
        'Garnish with coriander leaves and serve hot.'
      ]
    },
    {
      id: 10,
      title: 'Mix Veg Sabzi',
      description: 'Hearty mixed vegetable curry with South Indian tadka',
      prepTime: '15 min',
      cookTime: '25 min',
      servings: 4,
      category: 'dinner',
      ingredients: [
        '2 cups mixed vegetables (beans, carrot, peas, potato, cauliflower)',
        '2 tbsp oil',
        '1 tsp mustard seeds',
        '1 tsp cumin seeds',
        '1 onion, finely chopped',
        '2 tomatoes, chopped',
        '1 tsp ginger-garlic paste',
        '1/2 tsp turmeric powder',
        '1 tsp coriander powder',
        '1 tsp sambar powder or garam masala',
        'Salt to taste',
        'Coriander leaves for garnish'
      ],
      instructions: [
        'Parboil or steam the mixed vegetables until just tender.',
        'Heat oil, add mustard and cumin seeds; let them splutter.',
        'Add onions and sauté until golden, then add ginger-garlic paste.',
        'Add tomatoes and cook until soft and pulpy.',
        'Add turmeric, coriander powder, sambar powder, and salt; mix well.',
        'Add the cooked vegetables and a splash of water; simmer for 5–7 minutes.',
        'Garnish with coriander leaves and serve.'
      ]
    },
    {
      id: 11,
      title: 'Vangi Sabzi (Brinjal Curry)',
      description: 'Spiced brinjal curry inspired by traditional vangi preparations',
      prepTime: '15 min',
      cookTime: '25 min',
      servings: 4,
      category: 'dinner',
      ingredients: [
        '8–10 small brinjals (eggplants), slit or cubed',
        '2 tbsp oil',
        '1 tsp mustard seeds',
        '1 tsp cumin seeds',
        '1 onion, finely sliced',
        '1 tomato, chopped',
        '1/4 tsp turmeric powder',
        '1 tsp red chili powder',
        '1 tsp coriander powder',
        '1 tbsp tamarind pulp',
        'Salt to taste',
        'Coriander leaves for garnish'
      ],
      instructions: [
        'Soak slit brinjals in salted water for 10 minutes and drain.',
        'Heat oil, add mustard and cumin seeds; let them splutter.',
        'Add onions and sauté until golden; then add tomatoes.',
        'Add turmeric, red chili, coriander powder, and salt; cook until oil separates.',
        'Add brinjals and toss to coat with masala.',
        'Add tamarind pulp and a little water; cover and cook until brinjals are soft.',
        'Garnish with coriander leaves and serve with rice or rotis.'
      ]
    },
    {
      id: 12,
      title: 'Bhindi Sabzi',
      description: 'Dry okra stir-fry with onions and a gentle spice mix',
      prepTime: '15 min',
      cookTime: '20 min',
      servings: 4,
      category: 'dinner',
      ingredients: [
        '400 g bhindi (okra), washed, dried, and sliced',
        '2 tbsp oil',
        '1 tsp mustard seeds',
        '1 tsp cumin seeds',
        '1 onion, thinly sliced',
        '1/4 tsp turmeric powder',
        '1/2 tsp red chili powder',
        '1/2 tsp coriander powder',
        '1/2 tsp amchur (dry mango powder) or lemon juice',
        'Salt to taste'
      ],
      instructions: [
        'Heat oil in a wide pan; add mustard and cumin seeds.',
        'Add sliced onions and sauté until soft.',
        'Add bhindi and cook on medium heat, stirring occasionally, until non-sticky.',
        'Add turmeric, red chili, coriander powder, and salt; mix well.',
        'Cook until bhindi is tender and slightly crisp at the edges.',
        'Finish with amchur or a squeeze of lemon and serve hot.'
      ]
    },
    {
      id: 13,
      title: 'Beans Sabzi',
      description: 'Simple and comforting French beans stir-fry with coconut and spices',
      prepTime: '10 min',
      cookTime: '15 min',
      servings: 4,
      category: 'dinner',
      ingredients: [
        '3 cups French beans, finely chopped',
        '1 tbsp oil',
        '1 tsp mustard seeds',
        '1 tsp urad dal',
        '2 dried red chilies or green chilies',
        '8–10 curry leaves',
        '1/4 tsp turmeric powder',
        'Salt to taste',
        '1/4 cup fresh grated coconut'
      ],
      instructions: [
        'Heat oil in a pan and add mustard seeds.',
        'When they splutter, add urad dal, chilies, and curry leaves; sauté until dal turns golden.',
        'Add chopped beans, turmeric, and salt; mix well.',
        'Sprinkle a little water, cover, and cook on low heat until beans are tender but still bright green.',
        'Add grated coconut and sauté for 1–2 minutes.',
        'Serve hot with rice, sambar, or rasam.'
      ]
    }
  ],
  snacks: [
    {
      id: 14,
      title: 'Rasam',
      description: 'Tangy and aromatic South Indian soup with tamarind and spices',
      prepTime: '10 min',
      cookTime: '20 min',
      servings: 4,
      category: 'snacks',
      ingredients: [
        '1/2 cup toor dal, cooked and mashed',
        '1 lemon-sized tamarind, soaked',
        '2 tomatoes, chopped',
        '1 tsp rasam powder',
        '1/2 tsp turmeric powder',
        '1 tsp mustard seeds',
        '1 tsp cumin seeds',
        '2 dried red chilies',
        '8-10 curry leaves',
        '2 cloves garlic, crushed',
        '1/4 tsp asafoetida',
        '2 tbsp coriander leaves, chopped',
        'Salt to taste',
        '2 tsp oil or ghee'
      ],
      instructions: [
        'Extract tamarind juice and set aside',
        'Heat oil in a pan, add mustard seeds',
        'When they splutter, add cumin seeds, red chilies, curry leaves',
        'Add garlic and asafoetida, sauté for a few seconds',
        'Add chopped tomatoes and cook until soft',
        'Add tamarind juice, rasam powder, turmeric, and salt',
        'Add 2 cups water and bring to a boil',
        'Add mashed dal and simmer for 5-7 minutes',
        'Garnish with coriander leaves',
        'Serve hot with rice'
      ]
    },
    {
      id: 15,
      title: 'Sambar',
      description: 'Classic South Indian lentil stew with vegetables and aromatic spices',
      prepTime: '15 min',
      cookTime: '30 min',
      servings: 4,
      category: 'snacks',
      ingredients: [
        '1/2 cup toor dal',
        '1 cup mixed vegetables (drumstick, brinjal, okra, pumpkin)',
        '1 lemon-sized tamarind, soaked',
        '2 tbsp sambar powder',
        '1/2 tsp turmeric powder',
        '1 tsp mustard seeds',
        '1 tsp fenugreek seeds',
        '2 dried red chilies',
        '8-10 curry leaves',
        '1/4 tsp asafoetida',
        '2 tbsp coriander leaves, chopped',
        '1 tbsp oil',
        'Salt to taste'
      ],
      instructions: [
        'Pressure cook toor dal until soft and mash it',
        'Soak tamarind in warm water and extract juice',
        'Cook vegetables in tamarind water until tender',
        'Add sambar powder, turmeric, and salt',
        'Add mashed dal and simmer for 10 minutes',
        'Heat oil in a small pan for tempering',
        'Add mustard seeds, fenugreek seeds, red chilies, curry leaves, and asafoetida',
        'Pour tempering over sambar',
        'Garnish with coriander leaves',
        'Serve hot with rice, idli, or dosa'
      ]
    },
    {
      id: 16,
      title: 'Ponni Sambar',
      description: 'Traditional sambar made with ponni rice and vegetables',
      prepTime: '15 min',
      cookTime: '30 min',
      servings: 4,
      category: 'snacks',
      ingredients: [
        '1/2 cup toor dal',
        '1/4 cup ponni rice (raw rice)',
        '1 cup mixed vegetables (drumstick, brinjal, okra)',
        '1 lemon-sized tamarind, soaked',
        '2 tbsp sambar powder',
        '1/2 tsp turmeric powder',
        '1 tsp mustard seeds',
        '1 tsp urad dal',
        '2 dried red chilies',
        '8-10 curry leaves',
        '1/4 tsp asafoetida',
        '2 tbsp coriander leaves, chopped',
        '1 tbsp oil',
        'Salt to taste'
      ],
      instructions: [
        'Pressure cook toor dal and ponni rice together until soft',
        'Mash the dal and rice mixture',
        'Soak tamarind in warm water and extract juice',
        'Cook vegetables in tamarind water until tender',
        'Add sambar powder, turmeric, and salt',
        'Add mashed dal-rice mixture and simmer for 10 minutes',
        'Heat oil for tempering, add mustard seeds, urad dal',
        'Add red chilies, curry leaves, and asafoetida',
        'Pour tempering over sambar',
        'Garnish with coriander leaves and serve hot'
      ]
    },
    {
      id: 17,
      title: 'Metho Sambar',
      description: 'Fenugreek-flavored sambar with a distinct bitter-sweet taste',
      prepTime: '15 min',
      cookTime: '30 min',
      servings: 4,
      category: 'snacks',
      ingredients: [
        '1/2 cup toor dal',
        '1 cup vegetables (drumstick, brinjal, okra)',
        '2 tbsp fresh methi (fenugreek) leaves or 1 tsp dried',
        '1 lemon-sized tamarind, soaked',
        '2 tbsp sambar powder',
        '1/2 tsp turmeric powder',
        '1 tsp mustard seeds',
        '1 tsp urad dal',
        '2 dried red chilies',
        '8-10 curry leaves',
        '1/4 tsp asafoetida',
        '2 tbsp coriander leaves, chopped',
        '1 tbsp oil',
        'Salt to taste'
      ],
      instructions: [
        'Pressure cook toor dal until soft and mash it',
        'If using fresh methi leaves, clean and chop them',
        'Soak tamarind in warm water and extract juice',
        'Cook vegetables in tamarind water until tender',
        'Add methi leaves and cook for 2-3 minutes',
        'Add sambar powder, turmeric, and salt',
        'Add mashed dal and simmer for 10 minutes',
        'Heat oil for tempering, add mustard seeds, urad dal',
        'Add red chilies, curry leaves, and asafoetida',
        'Pour tempering over sambar, garnish with coriander leaves',
        'Serve hot with rice or idli'
      ]
    },
    {
      id: 18,
      title: 'Aviyal',
      description: 'Mixed vegetable curry in coconut and yogurt gravy - a Kerala specialty',
      prepTime: '20 min',
      cookTime: '25 min',
      servings: 4,
      category: 'snacks',
      ingredients: [
        '2 cups mixed vegetables (carrot, beans, drumstick, brinjal, raw banana, yam)',
        '1 cup fresh grated coconut',
        '3-4 green chilies',
        '1 tsp cumin seeds',
        '1/2 cup yogurt, beaten',
        '1/2 tsp turmeric powder',
        '8-10 curry leaves',
        '2 tbsp coconut oil',
        '1/4 tsp mustard seeds',
        'Salt to taste'
      ],
      instructions: [
        'Cut vegetables into long, uniform pieces',
        'Cook vegetables with turmeric, salt, and a little water until tender but not mushy',
        'Grind coconut, green chilies, and cumin seeds to a coarse paste',
        'Add the ground paste to cooked vegetables',
        'Simmer for 5 minutes on low heat',
        'Remove from heat and add beaten yogurt, mix gently',
        'Heat coconut oil in a small pan',
        'Add mustard seeds and curry leaves for tempering',
        'Pour tempering over aviyal',
        'Serve hot with rice or as a side dish'
      ]
    },
    {
      id: 19,
      title: 'Bisi Belle Bath',
      description: 'Spicy and flavorful rice-lentil one-pot meal from Karnataka',
      prepTime: '20 min',
      cookTime: '30 min',
      servings: 4,
      category: 'snacks',
      ingredients: [
        '1 cup rice',
        '1/2 cup toor dal',
        '1 cup mixed vegetables (carrot, beans, peas, potato)',
        '2 tbsp bisi belle bath powder',
        '1 lemon-sized tamarind, soaked',
        '1/2 tsp turmeric powder',
        '1 tsp mustard seeds',
        '1 tsp urad dal',
        '2 dried red chilies',
        '8-10 curry leaves',
        '1/4 tsp asafoetida',
        '2 tbsp ghee',
        '2 tbsp cashews',
        '2 tbsp coriander leaves, chopped',
        'Salt to taste'
      ],
      instructions: [
        'Pressure cook rice and toor dal together with 3 cups water',
        'Soak tamarind in warm water and extract juice',
        'Cook vegetables in tamarind water until tender',
        'Add bisi belle bath powder, turmeric, and salt',
        'Add cooked rice-dal mixture and mix well',
        'Simmer for 5-7 minutes until everything comes together',
        'Heat ghee in a pan, add cashews and fry until golden',
        'Add mustard seeds, urad dal, red chilies, curry leaves, and asafoetida',
        'Pour tempering over bisi belle bath',
        'Garnish with coriander leaves and serve hot with papad or chips'
      ]
    },
    {
      id: 20,
      title: 'Tamarind Pulusu',
      description: 'Tangy tamarind-based curry with vegetables - a Telugu favorite',
      prepTime: '15 min',
      cookTime: '25 min',
      servings: 4,
      category: 'snacks',
      ingredients: [
        '1 cup vegetables (okra, brinjal, drumstick, or bottle gourd)',
        '1 lemon-sized tamarind, soaked',
        '2 tbsp jaggery, grated',
        '1 tsp red chili powder',
        '1/2 tsp turmeric powder',
        '1 tsp mustard seeds',
        '1 tsp fenugreek seeds',
        '2 dried red chilies',
        '8-10 curry leaves',
        '1/4 tsp asafoetida',
        '2 tbsp coriander leaves, chopped',
        '2 tbsp oil',
        'Salt to taste'
      ],
      instructions: [
        'Soak tamarind in warm water and extract thick juice',
        'Cut vegetables into pieces',
        'Heat oil in a pan, add mustard seeds',
        'When they splutter, add fenugreek seeds, red chilies, curry leaves, and asafoetida',
        'Add vegetables and sauté for 2-3 minutes',
        'Add tamarind juice, 1 cup water, turmeric, red chili powder, and salt',
        'Bring to a boil and simmer until vegetables are cooked',
        'Add jaggery and mix until dissolved',
        'Simmer for another 5 minutes until the gravy thickens slightly',
        'Garnish with coriander leaves and serve hot with rice'
      ]
    }
  ],
  'quick-foods': [
    {
      id: 21,
      title: 'Quick Lemon Rice',
      description: 'Tangy and flavorful lemon rice ready in minutes',
      prepTime: '5 min',
      cookTime: '10 min',
      servings: 2,
      category: 'quick-foods',
      ingredients: [
        '1 cup cooked rice (preferably day-old)',
        '2 tbsp oil',
        '1 tsp mustard seeds',
        '1 tsp urad dal',
        '1 tsp chana dal',
        '2 dried red chilies',
        '8-10 curry leaves',
        '1/4 tsp turmeric powder',
        '2 tbsp lemon juice',
        'Salt to taste',
        'Coriander leaves for garnish'
      ],
      instructions: [
        'Heat oil in a pan, add mustard seeds and let them splutter',
        'Add urad dal and chana dal, fry until golden',
        'Add dried red chilies and curry leaves',
        'Add turmeric powder and mix well',
        'Add cooked rice and salt, mix gently',
        'Add lemon juice and mix until rice is evenly coated',
        'Garnish with coriander leaves and serve hot'
      ]
    },
    {
      id: 22,
      title: 'Instant Rava Upma',
      description: 'Quick and delicious semolina upma for a perfect breakfast',
      prepTime: '5 min',
      cookTime: '10 min',
      servings: 2,
      category: 'quick-foods',
      ingredients: [
        '1 cup rava (semolina)',
        '2 tbsp oil',
        '1 tsp mustard seeds',
        '1 tsp urad dal',
        '1 onion, finely chopped',
        '1 green chili, chopped',
        '1/2 inch ginger, grated',
        '8-10 curry leaves',
        '2 cups hot water',
        'Salt to taste',
        'Coriander leaves and lemon wedges for garnish'
      ],
      instructions: [
        'Dry roast rava in a pan until light golden, set aside',
        'Heat oil in the same pan, add mustard seeds',
        'When they splutter, add urad dal and fry until golden',
        'Add chopped onion, green chili, ginger, and curry leaves',
        'Sauté until onions are translucent',
        'Add hot water and salt, bring to a boil',
        'Add roasted rava gradually, stirring continuously',
        'Cover and cook on low heat for 2-3 minutes',
        'Garnish with coriander leaves and serve with lemon wedges'
      ]
    },
    {
      id: 23,
      title: 'Quick Poha',
      description: 'Light and fluffy flattened rice breakfast with vegetables',
      prepTime: '5 min',
      cookTime: '10 min',
      servings: 2,
      category: 'quick-foods',
      ingredients: [
        '1 cup thick poha (flattened rice)',
        '2 tbsp oil',
        '1 tsp mustard seeds',
        '1 onion, finely chopped',
        '1 green chili, chopped',
        '1/4 tsp turmeric powder',
        '8-10 curry leaves',
        '2 tbsp peanuts',
        'Salt to taste',
        'Coriander leaves and lemon juice for garnish'
      ],
      instructions: [
        'Wash poha in water and drain immediately, set aside',
        'Heat oil in a pan, add mustard seeds',
        'When they splutter, add peanuts and fry until golden',
        'Add chopped onion and green chili, sauté until soft',
        'Add turmeric powder and curry leaves',
        'Add drained poha and salt, mix gently',
        'Cook for 2-3 minutes on low heat',
        'Garnish with coriander leaves and lemon juice, serve hot'
      ]
    },
    {
      id: 24,
      title: 'Quick Tomato Rice',
      description: 'Simple and tangy tomato rice with aromatic spices',
      prepTime: '5 min',
      cookTime: '10 min',
      servings: 2,
      category: 'quick-foods',
      ingredients: [
        '1 cup cooked rice',
        '2 large tomatoes, chopped',
        '2 tbsp oil',
        '1 tsp mustard seeds',
        '1 tsp urad dal',
        '1 tsp chana dal',
        '2 dried red chilies',
        '8-10 curry leaves',
        '1/2 tsp turmeric powder',
        '1 tsp red chili powder',
        'Salt to taste',
        'Coriander leaves for garnish'
      ],
      instructions: [
        'Heat oil in a pan, add mustard seeds and let them splutter',
        'Add urad dal, chana dal, and fry until golden',
        'Add dried red chilies and curry leaves',
        'Add chopped tomatoes and cook until soft',
        'Add turmeric, red chili powder, and salt',
        'Cook until tomatoes are mushy and oil separates',
        'Add cooked rice and mix gently until well combined',
        'Garnish with coriander leaves and serve hot'
      ]
    },
    {
      id: 25,
      title: 'Instant Masala Toast',
      description: 'Crispy and spicy toast perfect for a quick snack',
      prepTime: '5 min',
      cookTime: '5 min',
      servings: 2,
      category: 'quick-foods',
      ingredients: [
        '4 slices bread',
        '2 tbsp butter',
        '1 onion, finely chopped',
        '1 green chili, chopped',
        '1/4 tsp turmeric powder',
        '1/2 tsp red chili powder',
        '1/2 tsp garam masala',
        'Salt to taste',
        'Coriander leaves, chopped'
      ],
      instructions: [
        'Heat butter in a pan, add chopped onion and green chili',
        'Sauté until onions are translucent',
        'Add turmeric, red chili powder, garam masala, and salt',
        'Mix well and cook for a minute',
        'Spread the masala mixture on bread slices',
        'Heat a tawa or pan, place bread slices masala side down',
        'Cook until crispy and golden',
        'Garnish with coriander leaves and serve hot'
      ]
    },
    {
      id: 26,
      title: 'Quick Fruit Salad',
      description: 'Fresh and healthy fruit salad with a hint of spice',
      prepTime: '10 min',
      cookTime: '0 min',
      servings: 2,
      category: 'quick-foods',
      ingredients: [
        '1 apple, chopped',
        '1 banana, sliced',
        '1 orange, segmented',
        '1/2 cup pomegranate seeds',
        '1/2 cup grapes, halved',
        '1 tsp lemon juice',
        '1/2 tsp chaat masala (optional)',
        '1 tsp honey (optional)',
        'Fresh mint leaves for garnish'
      ],
      instructions: [
        'Wash and chop all fruits into bite-sized pieces',
        'Mix all fruits in a bowl',
        'Add lemon juice to prevent browning',
        'Add chaat masala and honey if using',
        'Toss gently to combine',
        'Garnish with fresh mint leaves',
        'Serve immediately or chill before serving'
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
  const [currentView, setCurrentView] = useState('home') // 'home', 'categories', 'category', 'recipe', 'meal-recommender'
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [recommenderForm, setRecommenderForm] = useState({
    time: '',
    diet: '',
    ingredients: '',
    spiceTolerance: '',
    mood: ''
  })
  const [mealRecommendation, setMealRecommendation] = useState(null)
  const recommendationRef = useRef(null)

  // Auto-scroll to recommendations when they populate
  useEffect(() => {
    if (mealRecommendation && mealRecommendation.recipes && mealRecommendation.recipes.length > 0) {
      setTimeout(() => {
        if (recommendationRef.current) {
          recommendationRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          })
        }
      }, 300) // Small delay to ensure DOM is updated
    }
  }, [mealRecommendation])

  // Initialize browser history
  useEffect(() => {
    // Set initial history state
    if (window.history.state === null) {
      window.history.replaceState({ view: 'home', category: null, recipe: null }, '', window.location.href)
    }

    // Handle browser back/forward buttons
    const handlePopState = (event) => {
      if (event.state) {
        const { view, category, recipe } = event.state
        setCurrentView(view || 'home')
        setSelectedCategory(category || null)
        if (recipe) {
          const allRecipes = [
            ...(recipes.breakfast || []),
            ...(recipes.lunch || []),
            ...(recipes.dinner || []),
            ...(recipes.snacks || []),
            ...(recipes['quick-foods'] || [])
          ]
          const foundRecipe = allRecipes.find(r => r.id === recipe)
          setSelectedRecipe(foundRecipe || null)
        } else {
          setSelectedRecipe(null)
        }
        window.scrollTo({ top: 0, behavior: 'instant' })
      } else {
        // Fallback to home if no state
        setCurrentView('home')
        setSelectedCategory(null)
        setSelectedRecipe(null)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [recipes])

  // Helper function to update history
  const updateHistory = (view, category = null, recipe = null) => {
    window.history.pushState({ view, category, recipe }, '', window.location.href)
  }

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId)
    setCurrentView('category')
    updateHistory('category', categoryId, null)
    // Scroll to top after state update, especially important for mobile
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 0)
  }

  const handleGetCooking = () => {
    setCurrentView('categories')
    updateHistory('categories', null, null)
  }

  const handleRecipeClick = (recipe) => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setSelectedRecipe(recipe)
    setCurrentView('recipe')
    updateHistory('recipe', recipe.category, recipe.id)
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setSelectedCategory(null)
    setSelectedRecipe(null)
    updateHistory('home', null, null)
  }

  const handleBackToCategory = () => {
    setCurrentView('category')
    setSelectedRecipe(null)
    if (selectedRecipe) {
      updateHistory('category', selectedRecipe.category, null)
    }
  }

  const handleViewAllRecipes = () => {
    setCurrentView('categories')
    setSelectedCategory(null)
    setSelectedRecipe(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    updateHistory('categories', null, null)
  }

  // Smart Meal Recommendation Logic
  const generateMealRecommendation = () => {
    const { time, diet, ingredients, spiceTolerance, mood } = recommenderForm
    
    // Get all recipes flattened
    const allRecipes = [
      ...(recipes.breakfast || []).map(r => ({...r, category: 'breakfast'})),
      ...(recipes.lunch || []).map(r => ({...r, category: 'lunch'})),
      ...(recipes.dinner || []).map(r => ({...r, category: 'dinner'})),
      ...(recipes.snacks || []).map(r => ({...r, category: 'snacks'})),
      ...(recipes['quick-foods'] || []).map(r => ({...r, category: 'quick-foods'}))
    ]
    
    // Normalize ingredient names for better matching
    const normalizeIngredient = (ing) => {
      const normalized = ing.toLowerCase().trim()
      // Handle common variations
      const variations = {
        'egg': ['egg', 'eggs'],
        'onion': ['onion', 'onions'],
        'cauliflower': ['cauliflower', 'gobi'],
        'tomato': ['tomato', 'tomatoes'],
        'potato': ['potato', 'potatoes', 'aloo'],
        'carrot': ['carrot', 'carrots'],
        'beans': ['beans', 'green beans', 'french beans'],
        'coconut': ['coconut', 'coco'],
        'dal': ['dal', 'dhal', 'dahl'],
        'rice': ['rice'],
        'poha': ['poha', 'flattened rice'],
        'rava': ['rava', 'semolina', 'sooji']
      }
      
      // Find matching variation
      for (const [key, values] of Object.entries(variations)) {
        if (values.some(v => normalized.includes(v) || v.includes(normalized))) {
          return key
        }
      }
      return normalized
    }
    
    // Check if recipe contains ingredient (with better matching)
    const recipeContainsIngredient = (recipe, ingredient) => {
      const normalizedIng = normalizeIngredient(ingredient)
      const recipeText = (recipe.ingredients?.join(' ') + ' ' + recipe.title + ' ' + recipe.description).toLowerCase()
      
      // Direct match
      if (recipeText.includes(normalizedIng)) return true
      
      // Check for variations
      const variations = {
        'egg': ['egg', 'eggs'],
        'onion': ['onion', 'onions'],
        'cauliflower': ['cauliflower', 'gobi'],
        'tomato': ['tomato', 'tomatoes'],
        'potato': ['potato', 'potatoes', 'aloo'],
        'carrot': ['carrot', 'carrots'],
        'beans': ['beans', 'green beans', 'french beans'],
        'coconut': ['coconut', 'coco'],
        'dal': ['dal', 'dhal', 'dahl', 'chana dal', 'urad dal', 'moong dal'],
        'rice': ['rice'],
        'poha': ['poha', 'flattened rice'],
        'rava': ['rava', 'semolina', 'sooji']
      }
      
      if (variations[normalizedIng]) {
        return variations[normalizedIng].some(v => recipeText.includes(v))
      }
      
      // Partial word match (e.g., "cauliflower" in "mixed vegetables (beans, carrot, peas, potato, cauliflower)")
      const words = normalizedIng.split(' ')
      return words.some(word => {
        if (word.length < 3) return false
        return recipeText.includes(word)
      })
    }
    
    // Score recipe based on criteria
    const scoreRecipe = (recipe) => {
      let score = 0
      
      // Time matching (higher score for better time match)
      if (time) {
        const totalTime = parseInt(recipe.prepTime?.match(/\d+/)?.[0] || 0) + 
                         parseInt(recipe.cookTime?.match(/\d+/)?.[0] || 0)
        if (time === '15' && totalTime <= 15) score += 10
        else if (time === '30' && totalTime <= 30) score += 8
        else if (time === 'sunday') score += 5 // Sunday special - any time is fine
        else if (time === '15' && totalTime > 15) return -100 // Exclude if too long
        else if (time === '30' && totalTime > 30) return -100 // Exclude if too long
      }
      
      // Ingredient matching (higher score for more matches)
      if (ingredients) {
        const userIngredients = ingredients.toLowerCase().split(',').map(i => i.trim()).filter(i => i)
        let ingredientMatches = 0
        userIngredients.forEach(ing => {
          if (recipeContainsIngredient(recipe, ing)) {
            ingredientMatches++
            score += 15 // High weight for ingredient matches
          }
        })
        // Bonus if multiple ingredients match
        if (ingredientMatches === userIngredients.length && userIngredients.length > 0) {
          score += 20 // Perfect match bonus
        }
        // Penalize if no ingredients match and user provided ingredients
        if (ingredientMatches === 0 && userIngredients.length > 0) {
          score -= 50 // Heavy penalty
        }
      }
      
      // Diet matching
      if (diet) {
        const recipeText = (recipe.title + ' ' + recipe.description + ' ' + recipe.ingredients?.join(' ')).toLowerCase()
        
        if (diet === 'egg') {
          if (recipeText.includes('egg')) score += 10
          else score -= 5
        } else if (diet === 'veg') {
          // Vegetarian - exclude if contains meat/fish
          if (recipeText.match(/\b(chicken|meat|fish|prawn|shrimp|mutton|beef|pork)\b/)) {
            score -= 100
          } else {
            score += 5
          }
        } else if (diet === 'high-protein') {
          const proteinKeywords = ['dal', 'dal', 'egg', 'paneer', 'tofu', 'chickpea', 'lentil']
          if (proteinKeywords.some(kw => recipeText.includes(kw))) score += 10
        } else if (diet === 'pcos') {
          // PCOS friendly - prefer low glycemic, high fiber
          const pcosFriendly = ['dal', 'vegetable', 'sabzi', 'beans', 'cauliflower']
          if (pcosFriendly.some(kw => recipeText.includes(kw))) score += 10
        }
      }
      
      // Spice tolerance
      if (spiceTolerance) {
        const recipeText = (recipe.title + ' ' + recipe.description + ' ' + recipe.ingredients?.join(' ')).toLowerCase()
        const spicyKeywords = ['chili', 'chilies', 'spicy', 'hot', 'pepper', 'red chilies', 'green chilies']
        const isSpicy = spicyKeywords.some(kw => recipeText.includes(kw))
        
        if (spiceTolerance === 'mild' && isSpicy) {
          score -= 10 // Prefer less spicy
        } else if (spiceTolerance === 'hot' && !isSpicy) {
          score -= 5 // Prefer spicy
        } else if (spiceTolerance === 'medium') {
          score += 5 // Medium is flexible
        }
      }
      
      // Mood matching
      if (mood) {
        const recipeText = (recipe.title + ' ' + recipe.description).toLowerCase()
        if (mood === 'comfort') {
          const comfortKeywords = ['halwa', 'sweet', 'puri', 'poli', 'rich', 'fudgy']
          if (comfortKeywords.some(kw => recipeText.includes(kw))) score += 10
        } else if (mood === 'light') {
          const lightKeywords = ['light', 'fresh', 'sabzi', 'vegetable', 'stir-fry']
          if (lightKeywords.some(kw => recipeText.includes(kw))) score += 10
        } else if (mood === 'festive') {
          const festiveKeywords = ['halwa', 'sweet', 'poli', 'special', 'festive']
          if (festiveKeywords.some(kw => recipeText.includes(kw))) score += 10
        }
      }
      
      return score
    }
    
    // Score all recipes
    const scoredRecipes = allRecipes.map(recipe => ({
      ...recipe,
      score: scoreRecipe(recipe)
    })).filter(recipe => recipe.score > -50) // Filter out heavily penalized recipes
    
    // Sort by score (highest first)
    scoredRecipes.sort((a, b) => b.score - a.score)
    
    // Better categorization with scoring
    const categorizeRecipe = (recipe) => {
      const title = recipe.title.toLowerCase()
      const category = recipe.category
      
      // Mains: substantial dishes that can be the center of a meal
      if (category === 'dinner' || category === 'snacks' || 
          title.includes('sabzi') || title.includes('sambar') || 
          title.includes('rasam') || title.includes('pulusu') ||
          title.includes('bisi') || title.includes('aviyal')) {
        return 'main'
      }
      
      // Sides: accompaniments, chutneys, smaller dishes
      if (category === 'breakfast' && 
          (title.includes('chutney') || title.includes('chutney'))) {
        return 'side'
      }
      
      // Add-ons: quick items, snacks, extras
      if (category === 'quick-foods' || 
          (category === 'breakfast' && !title.includes('chutney')) ||
          title.includes('rice') || title.includes('poha') || title.includes('upma')) {
        return 'addon'
      }
      
      // Sweets can be sides or add-ons
      if (category === 'lunch' && 
          (title.includes('halwa') || title.includes('sweet') || title.includes('poli'))) {
        return 'side'
      }
      
      // Default categorization
      if (category === 'dinner' || category === 'snacks') return 'main'
      if (category === 'breakfast') return 'side'
      if (category === 'quick-foods') return 'addon'
      return 'main'
    }
    
    // Get top scored recipes (no categorization - just individual recipes)
    const getTopRecipes = (count = 5) => {
      // Remove duplicates and get top scored recipes
      const uniqueRecipes = []
      const seenIds = new Set()
      
      for (const recipe of scoredRecipes) {
        if (!seenIds.has(recipe.id)) {
          uniqueRecipes.push(recipe)
          seenIds.add(recipe.id)
        }
        if (uniqueRecipes.length >= count) break
      }
      
      return uniqueRecipes
    }
    
    // Get 4-5 top individual recipes
    const recommendedRecipes = getTopRecipes(5)
    
    setMealRecommendation({
      recipes: recommendedRecipes
    })
  }

  const currentRecipes = selectedCategory ? recipes[selectedCategory] || [] : []

  return (
    <div className="app">
      {currentView === 'home' && (
        <div className="homepage-split">
          <div className="home-left">
            <div className="home-content">
              <img 
                src="/images/front_page_icon.png" 
                alt="Front page icon" 
                className="front-page-icon"
              />
              <h1 className="main-title">
                <span>Savor Every Bite</span>
                <span>with Sasi's</span>
                <span>Recipes</span>
                <span className="main-title-subtitle">Authentic South Indian Flavors</span>
              </h1>
              <div className="title-divider"></div>
              <div className="social-proof-badge">
                <span className="badge-icon">✨</span>
                <span className="badge-text">100+ Trusted Recipes</span>
              </div>
              <p className="home-description">
                <span className="quote-mark-start">"</span>
                These recipes are easy to follow, beginner friendly, and made with simple ingredients you already know. Whether you are learning to cook or just want reliable home food, you will find dishes that actually work and taste like home.
                <span className="quote-mark-end">"</span>
              </p>
              <div className="home-cta-buttons">
                <button className="get-cooking-button" onClick={handleGetCooking}>
                  <span>Get Cooking</span>
                  <svg className="button-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
                <button 
                  className="what-to-cook-home-button" 
                  onClick={() => {
                    setCurrentView('meal-recommender')
                    updateHistory('meal-recommender', null, null)
                  }}
                >
                  <span>What to cook?</span>
                </button>
              </div>
            </div>
          </div>
          <div className="divider-line"></div>
          <div className="home-right">
            <div className="food-collage-grid">
              <div 
                className="food-collage-item" 
                style={{ animationDelay: '0.1s' }}
                onClick={() => handleCategoryClick('breakfast')}
              >
                <img src="/images/coconut_chutney.png" alt="Chutney" className="collage-image" />
                <div className="collage-overlay">
                  <span className="collage-label">Chutneys</span>
                </div>
              </div>
              <div 
                className="food-collage-item" 
                style={{ animationDelay: '0.2s' }}
                onClick={() => handleCategoryClick('lunch')}
              >
                <img src="/images/ashoka_halwa.png" alt="Sweet" className="collage-image" />
                <div className="collage-overlay">
                  <span className="collage-label">Sweets</span>
                </div>
              </div>
              <div 
                className="food-collage-item" 
                style={{ animationDelay: '0.3s' }}
                onClick={() => handleCategoryClick('dinner')}
              >
                <img src="/images/carrot_sabzi.png" alt="Sabzi" className="collage-image" />
                <div className="collage-overlay">
                  <span className="collage-label">Sabzis</span>
                </div>
              </div>
              <div 
                className="food-collage-item" 
                style={{ animationDelay: '0.4s' }}
                onClick={() => handleCategoryClick('snacks')}
              >
                <img src="/images/rasam.png" alt="Gravy" className="collage-image" />
                <div className="collage-overlay">
                  <span className="collage-label">Gravies</span>
                </div>
              </div>
              <div 
                className="food-collage-item" 
                style={{ animationDelay: '0.5s' }}
                onClick={() => handleCategoryClick('breakfast')}
              >
                <img src="/images/red_tomato_chutney.png" alt="Chutney" className="collage-image" />
                <div className="collage-overlay">
                  <span className="collage-label">Chutneys</span>
                </div>
              </div>
              <div 
                className="food-collage-item" 
                style={{ animationDelay: '0.6s' }}
                onClick={() => handleCategoryClick('lunch')}
              >
                <img src="/images/puran_poli.png" alt="Sweet" className="collage-image" />
                <div className="collage-overlay">
                  <span className="collage-label">Sweets</span>
                </div>
              </div>
              <div 
                className="food-collage-item" 
                style={{ animationDelay: '0.7s' }}
                onClick={() => handleCategoryClick('dinner')}
              >
                <img src="/images/mix_veg_sabzi.png" alt="Sabzi" className="collage-image" />
                <div className="collage-overlay">
                  <span className="collage-label">Sabzis</span>
                </div>
              </div>
              <div 
                className="food-collage-item" 
                style={{ animationDelay: '0.8s' }}
                onClick={() => handleCategoryClick('snacks')}
              >
                <img src="/images/sambar.png" alt="Gravy" className="collage-image" />
                <div className="collage-overlay">
                  <span className="collage-label">Gravies</span>
                </div>
              </div>
              <div 
                className="food-collage-item" 
                style={{ animationDelay: '0.9s' }}
                onClick={() => handleCategoryClick('quick-foods')}
              >
                <img src="/images/chutneys_category_image.png" alt="Quick Food" className="collage-image" />
                <div className="collage-overlay">
                  <span className="collage-label">Quick Foods</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {(currentView === 'categories' || currentView === 'category' || currentView === 'recipe' || currentView === 'meal-recommender') && (
        <header className="header header-categories">
          {currentView === 'categories' && (
            <button className="header-back-button" onClick={handleBackToHome} title="Back to Home">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
          )}
          {currentView === 'meal-recommender' && (
            <button className="header-back-button" onClick={handleBackToHome} title="Back to Home">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
          )}
          <div className="header-title-wrapper">
            <img 
              src="/images/chef_hat_logo.png" 
              alt="Chef hat logo" 
              className="header-mandala-icon"
            />
            <h1 className="header-title-categories">Sasi's recipe book</h1>
          </div>
          {currentView !== 'meal-recommender' && (
            <button 
              className="header-what-to-cook-button"
              onClick={() => {
                setCurrentView('meal-recommender')
                updateHistory('meal-recommender', null, null)
              }}
            >
              What to cook?
            </button>
          )}
        </header>
      )}

      <main className={`main-content ${currentView === 'categories' || currentView === 'category' || currentView === 'meal-recommender' ? 'full-width' : ''}`}>
        {currentView === 'categories' && (
          <div className="categories-view">
            <div className="category-magazine-layout">
              {categories.map((category, index) => {
                const categoryImage = category.id === 'breakfast' ? '/images/chutneys_category_image.png' :
                  category.id === 'lunch' ? '/images/sweets_category_image.png' :
                  category.id === 'dinner' ? '/images/sabzi_image.png' :
                  category.id === 'quick-foods' ? '/images/chutneys_category_image.png' :
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
                               selectedCategory === 'quick-foods' ? '/images/chutneys_category_image.png' :
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
                               selectedCategory === 'quick-foods' ? 'QUICK' :
                               'SNACKS'}
                            </h2>
                            <h3 className="magazine-subtitle">
                              {selectedCategory === 'breakfast' ? 'CHUTNEYS' :
                               selectedCategory === 'lunch' ? 'CELEBRATIONS' :
                               selectedCategory === 'dinner' ? 'HARMONY' :
                               selectedCategory === 'quick-foods' ? 'FOODS' :
                               'DELIGHTS'}
                            </h3>
                          </div>
                          <div className="magazine-overlay-bottom-left">
                            <h4 className="magazine-feature-title">new luxury</h4>
                            <p className="magazine-feature-text">
                              {selectedCategory === 'breakfast' ? 'A quiet ode to the side dishes that make every idli, dosa, and evening tiffin sing.' :
                               selectedCategory === 'lunch' ? 'Celebrations wrapped in sweetness, where tradition meets the warmth of home.' :
                               selectedCategory === 'dinner' ? 'The heart of South Indian vegetarian cuisine, where fresh vegetables meet aromatic spices.' :
                               selectedCategory === 'quick-foods' ? 'Fast, fun, and flavorful - quick recipes that bring joy to your table in minutes.' :
                               'Crispy, flavorful, and perfectly spiced - the snacks that make every tea time special.'}
                            </p>
                          </div>
                          <div className="magazine-overlay-bottom-right">
                            <h4 className="magazine-brand-title">RECIPES</h4>
                            <p className="magazine-brand-text">
                              {selectedCategory === 'breakfast' ? 'From coconut and coriander to tomato and gongura, all pounded slow on ammikal.' :
                               selectedCategory === 'lunch' ? 'From creamy payasams to crumbly laddus, each sweet tells a story of festivals and family.' :
                               selectedCategory === 'dinner' ? 'Each dish celebrates the harmony of flavors, from dry stir-fries to rich, comforting gravies.' :
                               selectedCategory === 'quick-foods' ? 'From lemon rice to instant upma, these quick recipes are perfect for busy days and hungry moments.' :
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
                           selectedCategory === 'quick-foods' ? '15-Minute Quick Fun Foods' :
                           'Crispy Snacks & Delights'}
                        </h1>
                        
                        {/* White Card below title */}
                        {selectedCategory === 'quick-foods' ? (
                          <div className="quick-foods-benefits-callout">
                            <h3 className="callout-title">Why Cook at Home in 15 Minutes?</h3>
                            <div className="quick-foods-benefits-grid">
                              <div className="quick-foods-benefit-item-callout" style={{backgroundImage: "url('/images/chutneys_category_image.png')"}}>
                                <div className="benefit-overlay"></div>
                                <strong className="benefit-title-overlay">Fresh & Nutritious</strong>
                              </div>
                              <div className="quick-foods-benefit-item-callout" style={{backgroundImage: "url('/images/sweets_category_image.png')"}}>
                                <div className="benefit-overlay"></div>
                                <strong className="benefit-title-overlay">Save Money</strong>
                              </div>
                              <div className="quick-foods-benefit-item-callout" style={{backgroundImage: "url('/images/sabzi_image.png')"}}>
                                <div className="benefit-overlay"></div>
                                <strong className="benefit-title-overlay">Faster Than Delivery</strong>
                              </div>
                              <div className="quick-foods-benefit-item-callout" style={{backgroundImage: "url('/images/main_gravies_category_image.png')"}}>
                                <div className="benefit-overlay"></div>
                                <strong className="benefit-title-overlay">Made with Love</strong>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="sidebar-callout">
                            <h3 className="callout-title">
                              {selectedCategory === 'breakfast' ? 'What makes a chutney "authentically" South Indian?' :
                               selectedCategory === 'lunch' ? 'What makes sweets special in South Indian culture?' :
                               selectedCategory === 'dinner' ? 'What defines authentic South Indian sabzis?' :
                               'What makes South Indian snacks unique?'}
                            </h3>
                            <p className="callout-text">
                              {selectedCategory === 'breakfast' ? 'Freshly scraped coconut, roasted lentils, a tempering of mustard and curry leaves in gingelly oil, and the rhythm of hands on stone. Each family guards its own ratios, but the soul is always the same. These humble accompaniments transform simple meals into feasts, turning morning idlis and evening dosas into moments of pure comfort. Passed down through generations, each recipe carries the whispers of grandmothers and the warmth of home kitchens.' :
                               selectedCategory === 'lunch' ? 'Jaggery instead of sugar, fresh coconut, ghee, and the patience of slow cooking. Each sweet carries the warmth of celebrations, the sweetness of traditions, and the love of generations. From the rich, fudgy texture of Mysore Pak to the delicate layers of Adhirasam, these confections mark every milestone. They are offerings at temples, gifts during festivals, and the quiet comfort of a rainy afternoon with a cup of filter coffee.' :
                               selectedCategory === 'dinner' ? 'Fresh vegetables, mustard seeds popping in hot oil, curry leaves releasing their aroma, and the perfect balance of spices. Each dish respects the vegetable while creating layers of flavor. Whether it\'s a dry stir-fry that celebrates the crunch of beans or a rich, comforting gravy that wraps around rice, these sabzis are the heart of every South Indian meal. Cooked with care and served with love, they bring families together around the table.' :
                               'Crispy textures, bold spices, and the perfect balance of flavors. Made with rice flour, lentils, and traditional techniques that create that signature crunch and taste. From the morning vada that pairs perfectly with sambar to the evening mixture that makes tea time special, these snacks are more than just food. They are memories of childhood, the sound of festivals, and the simple joy of sharing a plate with loved ones.'}
                            </p>
                          </div>
                        )}
                        
                        {/* Modern CTA Button */}
                        <button 
                          className="explore-recipes-cta-modern"
                          onClick={() => {
                            const recipesSection = document.getElementById('recipes-section');
                            if (recipesSection) {
                              recipesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }}
                        >
                          <span className="cta-text">Explore recipes</span>
                          <span className="cta-arrow">→</span>
                          <span className="cta-shine"></span>
                        </button>
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
                        let categoryImage = '/images/chutneys_category_image.png'
                        if (selectedCategory === 'breakfast') {
                          if (recipe.title.toLowerCase().includes('coconut chutney')) {
                            categoryImage = '/images/coconut_chutney.png'
                          } else if (recipe.title.toLowerCase().includes('tomato chutney')) {
                            categoryImage = '/images/red_tomato_chutney.png'
                          } else if (recipe.title.toLowerCase().includes('coriander chutney')) {
                            categoryImage = '/images/green_chutney.png'
                          } else if (recipe.title.toLowerCase().includes('peanut chutney')) {
                            categoryImage = '/images/peanut_chutney.png'
                          }
                        } else if (selectedCategory === 'lunch') {
                          if (recipe.title.toLowerCase().includes('ashoka halwa')) {
                            categoryImage = '/images/ashoka_halwa.png'
                          } else if (recipe.title.toLowerCase().includes('puran poli')) {
                            categoryImage = '/images/puran_poli.png'
                          } else if (recipe.title.toLowerCase().includes('modhak')) {
                            categoryImage = '/images/modhuka.png'
                          } else if (recipe.title.toLowerCase().includes('payasam')) {
                            categoryImage = '/images/rice_payasam.png'
                          } else {
                            categoryImage = '/images/sweets_category_image.png'
                          }
                        } else if (selectedCategory === 'dinner') {
                          if (recipe.title.toLowerCase().includes('carrot')) {
                            categoryImage = '/images/carrot_sabzi.png'
                          } else if (recipe.title.toLowerCase().includes('beetroot')) {
                            categoryImage = '/images/beetroot_sabzi.png'
                          } else if (recipe.title.toLowerCase().includes('aloo')) {
                            categoryImage = '/images/aalo_sabzi.png'
                          } else if (recipe.title.toLowerCase().includes('mix veg')) {
                            categoryImage = '/images/mix_veg_sabzi.png'
                          } else if (recipe.title.toLowerCase().includes('vangi') || recipe.title.toLowerCase().includes('brinjal')) {
                            categoryImage = '/images/brinjal_sabzi.png'
                          } else if (recipe.title.toLowerCase().includes('bhindi')) {
                            categoryImage = '/images/bhindi_sabzi.png'
                          } else if (recipe.title.toLowerCase().includes('beans')) {
                            categoryImage = '/images/beans_sabzi.png'
                          } else {
                            categoryImage = '/images/sabzi_image.png'
                          }
                        } else if (selectedCategory === 'snacks') {
                          if (recipe.title.toLowerCase().includes('rasam')) {
                            categoryImage = '/images/rasam.png'
                          } else if (recipe.title.toLowerCase().includes('ponni sambar')) {
                            categoryImage = '/images/ponni_sambar.png'
                          } else if (recipe.title.toLowerCase().includes('metho sambar') || recipe.title.toLowerCase().includes('methi sambar')) {
                            categoryImage = '/images/methi_sambar.png'
                          } else if (recipe.title.toLowerCase().includes('sambar')) {
                            categoryImage = '/images/sambar.png'
                          } else if (recipe.title.toLowerCase().includes('aviyal')) {
                            categoryImage = '/images/aviyal.png'
                          } else if (recipe.title.toLowerCase().includes('bisi belle') || recipe.title.toLowerCase().includes('bisi bella')) {
                            categoryImage = '/images/bisi_belle.png'
                          } else if (recipe.title.toLowerCase().includes('tamarind pulusu') || recipe.title.toLowerCase().includes('pulusu')) {
                            categoryImage = '/images/tamarind_pulusu.png'
                          } else {
                            categoryImage = '/images/main_gravies_category_image.png'
                          }
                        } else if (selectedCategory === 'quick-foods') {
                          categoryImage = '/images/chutneys_category_image.png'
                        } else {
                          categoryImage = '/images/main_gravies_category_image.png'
                        }
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
                                {selectedCategory === 'quick-foods' && (
                                  <span className="recipe-tag-new">15 Mins</span>
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
          <RecipeDetail recipe={selectedRecipe} recipes={recipes} handleRecipeClick={handleRecipeClick} handleViewAllRecipes={handleViewAllRecipes} />
        )}

        {currentView === 'meal-recommender' && (
          <div className="meal-recommender-view">
            <div className="meal-recommender-split-layout">
              {/* Left Section */}
              <div className="meal-recommender-left-section">
                {/* Hero Section with Dark Brown Background */}
                <div className="meal-recommender-hero">
                  <div className="meal-recommender-hero-content">
                    <h1 className="meal-recommender-hero-title">Discover the Timeless Flavors of South India</h1>
                    <p className="meal-recommender-hero-description">
                      From the comforting chutneys that grace every breakfast table to the festive sweets that mark our celebrations, from the everyday sabzis that fill our homes with warmth to the soulful gravies that bring families together — these are the recipes that have been passed down through generations, each one a story of home, love, and the simple joy of good food.
                    </p>
                  </div>
                </div>

            {/* What Should I Cook Section */}
            <div className="meal-recommender-editors-note">
              <h2 className="editors-note-title">What Should I Cook Today?</h2>
              <p className="editors-note-subtitle">The Question That Haunts Every Kitchen</p>
            </div>

            {/* Problem Statement Section */}
            <div className="meal-recommender-problem-section">
                  <div className="problem-text-block">
                    <p className="problem-text-italic">
                      You have the recipes. You have the ingredients. What you don't have after a long day is the mental energy to decide what to cook. The question "What should I make today?" shouldn't add to your exhaustion—it should be answered for you.
                    </p>
                    <p className="problem-text">
                      We've all been there: standing in front of the pantry, ingredients in hand, but completely drained from making decisions all day. That's why we built something different—a smart meal recommender that understands your time constraints, your dietary preferences, what you already have at home, and even your mood. No more decision fatigue. Just a perfect South Indian meal plan, ready when you need it.
                    </p>
                  </div>
                </div>

                {/* CTA Section with Dark Brown Background */}
                <div className="meal-recommender-cta-section">
                  <div className="meal-recommender-cta-content">
                    <div className="cta-icon-wrapper">
                      <svg className="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 13h12M6 13c0 2.5 2 4.5 4.5 4.5h3c2.5 0 4.5-2 4.5-4.5M6 13V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5"/>
                        <path d="M9 21h6M12 17v4"/>
                      </svg>
                    </div>
                    <h2 className="cta-main-title">Let Us Decide For You</h2>
                    <p className="cta-subtitle">Our Smart Meal Recommender</p>
                  </div>
                </div>
              </div>

              {/* Right Section - Form */}
              <div className="meal-recommender-right-section">
                <div className="meal-recommender-form-section">
                  <div className="form-section-header">
                    <div className="form-decorative-line">
                      <span className="form-decorative-dot"></span>
                    </div>
                    <h3 className="form-section-title">Smart Meal Recommender</h3>
                    <p className="form-section-subtitle">Answer a few questions and let us craft your perfect meal</p>
                  </div>
                  
                  <div className="meal-recommender-form-magazine">
                      <div className="recommender-form-group">
                        <label>Time Available</label>
                        <select 
                          value={recommenderForm.time} 
                          onChange={(e) => setRecommenderForm({...recommenderForm, time: e.target.value})}
                          className={recommenderForm.time ? 'has-value' : ''}
                        >
                          <option value="">Select time</option>
                          <option value="15">15 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="sunday">Sunday special</option>
                        </select>
                      </div>
                      
                      <div className="recommender-form-group">
                        <label>Diet Preference</label>
                        <select 
                          value={recommenderForm.diet} 
                          onChange={(e) => setRecommenderForm({...recommenderForm, diet: e.target.value})}
                          className={recommenderForm.diet ? 'has-value' : ''}
                        >
                          <option value="">Select diet</option>
                          <option value="veg">Vegetarian</option>
                          <option value="egg">Egg-friendly</option>
                          <option value="high-protein">High Protein</option>
                          <option value="pcos">PCOS Friendly</option>
                        </select>
                      </div>
                      
                      <div className="recommender-form-group">
                        <label>Ingredients You Have (comma separated)</label>
                        <input 
                          type="text" 
                          placeholder="e.g., tomatoes, coconut, dal, eggs, cauliflower, onions"
                          value={recommenderForm.ingredients} 
                          onChange={(e) => setRecommenderForm({...recommenderForm, ingredients: e.target.value})}
                        />
                      </div>
                      
                      <div className="recommender-form-group">
                        <label>Spice Tolerance</label>
                        <select 
                          value={recommenderForm.spiceTolerance} 
                          onChange={(e) => setRecommenderForm({...recommenderForm, spiceTolerance: e.target.value})}
                          className={recommenderForm.spiceTolerance ? 'has-value' : ''}
                        >
                          <option value="">Select tolerance</option>
                          <option value="mild">Mild</option>
                          <option value="medium">Medium</option>
                          <option value="hot">Hot</option>
                        </select>
                      </div>
                      
                      <div className="recommender-form-group">
                        <label>Mood</label>
                        <select 
                          value={recommenderForm.mood} 
                          onChange={(e) => setRecommenderForm({...recommenderForm, mood: e.target.value})}
                          className={recommenderForm.mood ? 'has-value' : ''}
                        >
                          <option value="">Select mood</option>
                          <option value="comfort">Comfort Food</option>
                          <option value="light">Light & Fresh</option>
                          <option value="festive">Festive & Special</option>
                        </select>
                      </div>
                      
                      <button 
                        className="generate-recommendation-button-magazine"
                        onClick={() => generateMealRecommendation()}
                      >
                        What Should I Cook Today?
                      </button>
                      
                      {mealRecommendation && mealRecommendation.recipes && mealRecommendation.recipes.length > 0 && (
                        <div ref={recommendationRef} className="meal-recommendation-results-magazine">
                          <h4 className="results-title-magazine">Recommended Recipes</h4>
                          {mealRecommendation.recipes.map((recipe, index) => (
                            <div 
                              key={recipe.id || index}
                              className="recommendation-item-magazine clickable"
                              onClick={() => {
                                handleRecipeClick(recipe)
                              }}
                            >
                              <span className="recommendation-recipe-magazine">{recipe.title}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )}
      </main>

    </div>
  )
}

export default App
