import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";

const NutritionCheckerForm = () => {
  const [foodItem, setFoodItem] = useState("");
  const [nutritionResult, setNutritionResult] = useState(null);

  const handleSearchNutrition = async () => {
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(
          foodItem
        )}`,
        {
          headers: {
            "X-Api-Key": "P53JRO9JMHyUXLhtlNHdBQ==VJ0VOfbdCEKuJ7t8",
          },
        }
      );

      const data = response.data;

      if (Array.isArray(data) && data.length > 0) {
        setNutritionResult(data[0]);
      } else {
        alert("No nutrition information found for that food item.");
      }
    } catch (error) {
      console.error("Error fetching nutrition information:", error);
      alert("Failed to fetch nutrition data. Try again later.");
    }
  };

  const display = (val, unit = "") =>
    val === "Only available for premium subscribers." ||
    val === undefined ||
    val === null
      ? "N/A"
      : `${val}${unit}`;

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h2>Nutrition Information Search</h2>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearchNutrition();
            }}
          >
            <Form.Control
              type="text"
              value={foodItem}
              onChange={(e) => setFoodItem(e.target.value)}
              placeholder="Enter food item"
              className="mr-sm-2 my-2"
            />
            <Button
              variant="outline-success"
              className="my-2"
              onClick={handleSearchNutrition}
            >
              Get Nutrition
            </Button>
          </Form>
        </Col>
      </Row>

      {nutritionResult && (
        <Row>
          <Col>
            <h2>Nutrition Results</h2>
            <Table striped bordered hover responsive="md">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Serving Size</th>
                  <th>Calories</th>
                  <th>Total Fat</th>
                  <th>Saturated Fat</th>
                  <th>Cholesterol</th>
                  <th>Sodium</th>
                  <th>Carbohydrates</th>
                  <th>Fiber</th>
                  <th>Sugar</th>
                  <th>Protein</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{display(nutritionResult.name)}</td>
                  <td>{display(nutritionResult.serving_size_g, "g")}</td>
                  <td>{display(nutritionResult.calories)}</td>
                  <td>{display(nutritionResult.fat_total_g, "g")}</td>
                  <td>{display(nutritionResult.fat_saturated_g, "g")}</td>
                  <td>{display(nutritionResult.cholesterol_mg, "mg")}</td>
                  <td>{display(nutritionResult.sodium_mg, "mg")}</td>
                  <td>{display(nutritionResult.carbohydrates_total_g, "g")}</td>
                  <td>{display(nutritionResult.fiber_g, "g")}</td>
                  <td>{display(nutritionResult.sugar_g, "g")}</td>
                  <td>{display(nutritionResult.protein_g, "g")}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default NutritionCheckerForm;
