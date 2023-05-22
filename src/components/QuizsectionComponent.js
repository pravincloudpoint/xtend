import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Quiz = () => {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Madrid"],
      correctAnswer: 1,
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
    },
    {
      question: "What is the largest organ in the human body?",
      options: ["Heart", "Liver", "Skin", "Lung"],
      correctAnswer: 2,
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      const isCorrect =
        selectedOption === questions[currentQuestion].correctAnswer;
      setScore(score + (isCorrect ? 1 : 0));
      setSelectedOption(null);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const renderOptions = () => {
    const question = questions[currentQuestion];
    return question.options.map((option, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleOptionSelect(index)}
        style={[
          styles.option,
          {
            backgroundColor: selectedOption === index ? "#6495ED" : "#f2f2f2",
          },
        ]}
        activeOpacity={0.7}
      >
        <Text style={styles.optionText}>{option}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      {currentQuestion < questions.length ? (
        <View>
          <Text style={styles.questionText}>
            {questions[currentQuestion].question}
          </Text>
          <View style={styles.optionsContainer}>{renderOptions()}</View>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextQuestion}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.resultText}>Quiz completed! Score: {score}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  optionsContainer: {
    marginBottom: 20,
  },
  option: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: "#6495ED",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Quiz;
