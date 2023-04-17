package randon;

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class DiceRollGame {
    public static void main(String[] args) {
        JFrame frame = new JFrame("12-Sided Dice Roll Game");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(300, 200);

        JPanel panel = new JPanel();
        panel.setLayout(new BorderLayout());
        frame.add(panel);

        JLabel diceRollLabel = new JLabel("Click 'Roll Dice' to generate a random number", SwingConstants.CENTER);
        panel.add(diceRollLabel, BorderLayout.CENTER);

        JButton rollDiceButton = new JButton("Roll Dice");
        panel.add(rollDiceButton, BorderLayout.SOUTH);

        rollDiceButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int diceRoll = (int) (Math.random() * 12) + 1;
                diceRollLabel.setText("Dice roll result: " + diceRoll);
            }
        });

        frame.setVisible(true);
    }
}
