import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.sql.*;

public class AuthorTableGUI {
    private String username;


     public AuthorTableGUI() {
    } 

    public static void displayAuthorTable(String username) {
        SwingUtilities.invokeLater(() -> {
            JFrame frame = new JFrame("Authored Books Table");
            frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE); // Only dispose of this frame when closed
            frame.setSize(800, 250);
            frame.setLayout(new BorderLayout());
            frame.setLocationRelativeTo(null);

            // Create a JTable with a DefaultTableModel
            JTable table = new JTable(new DefaultTableModel());
            JScrollPane scrollPane = new JScrollPane(table);

            // Add the table to the frame
            frame.add(scrollPane, BorderLayout.CENTER);

            // Populate the table using the class method
            AuthorTableGUI.populateAuthorTable(table,username);

            frame.setVisible(true);
        });
    }

    // Method to populate JTable from the Books table
    public static void populateAuthorTable(JTable table, String username) {
        String url = "jdbc:sqlite:BookTable.db"; // Path to your SQLite database
        String query = "SELECT title, author, ISBN, publicationDate, availableCopies FROM Books WHERE author = ?"; // SQL query to fetch data
    
        try (Connection conn = DriverManager.getConnection(url);
             PreparedStatement stmt = conn.prepareStatement(query)) {  // Use PreparedStatement instead of Statement
    
            // Set the author parameter dynamically
            stmt.setString(1, username);  // Use the passed username parameter
    
            // Execute the query
            try (ResultSet rs = stmt.executeQuery()) {
                DefaultTableModel model = (DefaultTableModel) table.getModel();
    
                // Clear existing data from the table
                model.setRowCount(0);
    
                // Get column names from ResultSet metadata
                ResultSetMetaData metaData = rs.getMetaData();
                int columnCount = metaData.getColumnCount();
    
                // Add column names to the model
                for (int i = 1; i <= columnCount; i++) {
                    model.addColumn(metaData.getColumnName(i));
                }
    
                // Add rows to the model
                while (rs.next()) {
                    Object[] row = new Object[columnCount];
                    for (int i = 1; i <= columnCount; i++) {
                        row[i - 1] = rs.getObject(i);
                    }
                    model.addRow(row);
                }
            }
    
        } catch (SQLException e) {
            JOptionPane.showMessageDialog(null, "Error populating table: " + e.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        }

    }

}
    