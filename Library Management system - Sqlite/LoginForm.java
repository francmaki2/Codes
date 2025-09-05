import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.sql.*;

public class LoginForm extends JFrame {
    public JTextField userIDField;
    public JTextField usernameField;
    private JButton loginButton;
    private JLabel errorMessageLabel;
    
    
    // SQLite connection URL
    private static final String DB_URL = "jdbc:sqlite:PersonTable.db";

    public LoginForm() {
        
        // Frame setup
        setTitle("Login Form");
        setSize(400, 300);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        // Use BoxLayout to arrange components vertically
        setLayout(new BoxLayout(getContentPane(), BoxLayout.Y_AXIS));

        // UI components
        JLabel userIDLabel = new JLabel("User ID: ");
        JLabel usernameLabel = new JLabel("Username: ");
        userIDField = new JTextField(20);
        usernameField = new JTextField(20);
        loginButton = new JButton("Login");
        errorMessageLabel = new JLabel("Invalid credentials, please try again.");
        errorMessageLabel.setForeground(Color.RED);
        errorMessageLabel.setVisible(false);  
        

        // Add components to the frame (stacked vertically due to BoxLayout)
        add(userIDLabel);
        add(userIDField);
        add(Box.createRigidArea(new Dimension(0, 50)));  
        add(usernameLabel);
        add(usernameField);
        add(Box.createRigidArea(new Dimension(0, 50)));  
        add(loginButton);
        add(Box.createRigidArea(new Dimension(0, 50)));  
        add(errorMessageLabel);
        

    
        
        

        // Add action listener to the login button
        loginButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String userID = userIDField.getText();
                String username = usernameField.getText();
                String role = validateCredentials(userID, username);
                
                
                if (role != null) {
                    userID = userIDField.getText();
                    username = usernameField.getText();
                    // Now pass the userID to the appropriate class based on role
                    if (role.equals("Librarian")) {
                        // Pass the userID to LibrarianGUI
                        LibrarianGUI LibGUI = new LibrarianGUI();  // Pass the userID here
                        JOptionPane.showMessageDialog(null, "Logged in as Librarian!", "Success", JOptionPane.INFORMATION_MESSAGE);
                        LibGUI.DisplayLib();
                    } else if (role.equals("Member")) {
                        // Pass the userID to MemberGUI
                        MemberGUI memGUI = new MemberGUI(userID);  // Pass the userID here
                        JOptionPane.showMessageDialog(null, "Logged in as Member!", "Success", JOptionPane.INFORMATION_MESSAGE);
                        
                        memGUI.DisplayMem();

                    } else if (role.equals("Author")) {
                        // Pass the userID to AuthorGUI
                        AuthorGUI AuthGUI = new AuthorGUI(username);  // Pass the userID here
                        JOptionPane.showMessageDialog(null, "Logged in as Author!", "Success", JOptionPane.INFORMATION_MESSAGE);
                        
                        AuthGUI.DisplayAuth();

                    }
                    dispose();  // Close the login form
                
                } else {
                    // If invalid, show error message
                    errorMessageLabel.setVisible(true);
                }
            }
        });

     
    }



    // Method to validate credentials and return the role
    private String validateCredentials(String userID, String username) {
        String role = null;

        // Database connection
        try (Connection conn = DriverManager.getConnection(DB_URL)) {
            // SQL query to check if userID and username match and get the role
            String sql = "SELECT PersonField FROM Person WHERE PersonId = ? AND PersonName = ?";
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setString(1, userID);
                pstmt.setString(2, username);

                ResultSet rs = pstmt.executeQuery();
                if (rs.next()) {
                    role = rs.getString("PersonField");  // Get the role from the result set
                }
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        

        return role;
    }

    public static void main(String[] args) {
        // Set the look and feel to improve UI appearance (optional)
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (UnsupportedLookAndFeelException | ClassNotFoundException | InstantiationException | IllegalAccessException e) {
            e.printStackTrace();
        }
        
        // Create and display the login form
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new LoginForm().setVisible(true);
            }
        });
        
        
    }
}
