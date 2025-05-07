"use client"

import { useState, useEffect } from "react"
import axios from "axios"

function ItemList() {
  const [itemName, setItemName] = useState("")
  const [items, setItems] = useState([])
  const [successMessage, setSuccessMessage] = useState("")
  const [darkMode, setDarkMode] = useState(true) // Default to dark mode

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/items`)
    setItems(response.data)
  }

  const addItem = async () => {
    if (itemName.trim() !== "") {
      await axios.post(`${import.meta.env.VITE_API_URL}/items`, { name: itemName })
      setSuccessMessage("Item added successfully!")
      setItemName("")
      fetchItems()
      setTimeout(() => setSuccessMessage(""), 2000) // Hide message after 2 seconds
    }
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  // Define theme-based styles
  const getStyles = () => {
    const baseStyles = {
      container: {
        maxWidth: "450px",
        margin: "2rem auto",
        padding: "1.5rem",
        borderRadius: "12px",
        boxShadow: darkMode ? "0 4px 16px rgba(0, 0, 0, 0.3)" : "0 4px 12px rgba(0, 0, 0, 0.1)",
        fontFamily: "system-ui, -apple-system, sans-serif",
        transition: "all 0.3s ease",
      },
      pageBackground: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        transition: "background 0.3s ease",
      },
      header: {
        fontSize: "1.75rem",
        fontWeight: "600",
        marginBottom: "1.5rem",
        textAlign: "center",
        transition: "color 0.3s ease",
      },
      themeToggle: {
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "none",
        border: "none",
        fontSize: "1.5rem",
        cursor: "pointer",
        padding: "5px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.3s ease, background-color 0.3s ease",
      },
      inputGroup: {
        marginBottom: "1.25rem",
      },
      input: {
        width: "100%",
        padding: "0.75rem 1rem",
        fontSize: "1rem",
        borderRadius: "8px",
        outline: "none",
        transition: "all 0.2s ease",
        marginBottom: "0.75rem",
        boxSizing: "border-box",
      },
      button: {
        width: "100%",
        padding: "0.75rem",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "1rem",
        fontWeight: "500",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        boxSizing: "border-box",
      },
      successMessage: {
        fontSize: "0.9rem",
        fontWeight: "500",
        padding: "0.5rem",
        textAlign: "center",
        animation: "fadeIn 0.3s ease",
        transition: "color 0.3s ease",
      },
      itemsList: {
        marginTop: "1.5rem",
      },
      itemCard: {
        padding: "0.75rem 1rem",
        borderRadius: "8px",
        marginBottom: "0.5rem",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.3s ease",
        cursor: "default",
      },
      itemCardHover: {
        transform: "translateY(-2px)",
      },
      emptyList: {
        textAlign: "center",
        fontStyle: "italic",
        marginTop: "1rem",
        transition: "color 0.3s ease",
      },
    }

    // Apply theme-specific styles
    if (darkMode) {
      return {
        ...baseStyles,
        pageBackground: {
          ...baseStyles.pageBackground,
          background: "linear-gradient(135deg, #121212 0%, #1e1e1e 50%, #2d2d2d 100%)",
        },
        container: {
          ...baseStyles.container,
          backgroundColor: "rgba(30, 30, 30, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
        header: {
          ...baseStyles.header,
          color: "#e0e0e0",
        },
        themeToggle: {
          ...baseStyles.themeToggle,
          color: "#f0f0f0",
        },
        input: {
          ...baseStyles.input,
          backgroundColor: "rgba(45, 45, 45, 0.8)",
          color: "#e0e0e0",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
        button: {
          ...baseStyles.button,
          backgroundColor: "#6366f1",
        },
        buttonHover: {
          backgroundColor: "#4f46e5",
        },
        successMessage: {
          ...baseStyles.successMessage,
          color: "#10b981",
        },
        itemCard: {
          ...baseStyles.itemCard,
          backgroundColor: "rgba(45, 45, 45, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          color: "#e0e0e0",
        },
        itemCardHover: {
          ...baseStyles.itemCardHover,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          backgroundColor: "rgba(55, 55, 55, 0.5)",
        },
        emptyList: {
          ...baseStyles.emptyList,
          color: "#6b7280",
        },
      }
    } else {
      return {
        ...baseStyles,
        pageBackground: {
          ...baseStyles.pageBackground,
          background: "linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 50%, #dde9ff 100%)",
        },
        container: {
          ...baseStyles.container,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(0, 0, 0, 0.05)",
        },
        header: {
          ...baseStyles.header,
          color: "#333",
        },
        themeToggle: {
          ...baseStyles.themeToggle,
          color: "#333",
        },
        input: {
          ...baseStyles.input,
          backgroundColor: "white",
          color: "#333",
          border: "1px solid #ddd",
        },
        button: {
          ...baseStyles.button,
          backgroundColor: "#4361ee",
        },
        buttonHover: {
          backgroundColor: "#3a56d4",
        },
        successMessage: {
          ...baseStyles.successMessage,
          color: "#10b981",
        },
        itemCard: {
          ...baseStyles.itemCard,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          border: "1px solid #eee",
          color: "#333",
        },
        itemCardHover: {
          ...baseStyles.itemCardHover,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        },
        emptyList: {
          ...baseStyles.emptyList,
          color: "#9ca3af",
        },
      }
    }
  }

  const styles = getStyles()

  return (
    <>
      <div style={styles.pageBackground}></div>
      <div style={{ position: "relative" }}>
        <button
          onClick={toggleTheme}
          style={styles.themeToggle}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
        <div style={styles.container}>
          <h2 style={styles.header}>Item List</h2>
          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Enter item name..."
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              style={styles.input}
              onKeyPress={(e) => e.key === "Enter" && addItem()}
            />
            <button
              onClick={addItem}
              style={styles.button}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
            >
              Add Item
            </button>
          </div>

          {successMessage && <p style={styles.successMessage}>{successMessage}</p>}

          <div style={styles.itemsList}>
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item.id}
                  style={styles.itemCard}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = styles.itemCardHover.transform
                    e.currentTarget.style.boxShadow = styles.itemCardHover.boxShadow
                    e.currentTarget.style.backgroundColor = styles.itemCardHover.backgroundColor
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "none"
                    e.currentTarget.style.boxShadow = "none"
                    e.currentTarget.style.backgroundColor = styles.itemCard.backgroundColor
                  }}
                >
                  {item.name}
                </div>
              ))
            ) : (
              <p style={styles.emptyList}>No items added yet</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ItemList
