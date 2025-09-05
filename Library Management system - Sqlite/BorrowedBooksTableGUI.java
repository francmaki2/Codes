import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.sql.*;

public class BorrowedBooksTableGUI extends JFrame {

    public String userID;
    private static final String BORROWED_BOOKS_DB_URL = "jdbc:sqlite:BorrowedBooks.db";
    private static final String BOOKS_DB_URL = "jdbc:sqlite:BookTable.db";

    public BorrowedBooksTableGUI(String userID) {
        this.userID = userID;  // Store the userID
    }


     public BorrowedBooksTableGUI() {

    } 

    public void displayBorrowedBookTable() {
        setTitle("Borrowed Books");
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setSize(800, 250);
        setLocationRelativeTo(null);

        // Create a table model
        DefaultTableModel tableModel = new DefaultTableModel();
        tableModel.addColumn("Borrow ID");
        tableModel.addColumn("Person ID");
        tableModel.addColumn("Book Title");
        tableModel.addColumn("Borrow Date");
        tableModel.addColumn("Return Date");

        // Populate the table model with data
        System.out.println("BorrowedBooksTableGUI initialized with userID: " + userID);
        fetchBorrowedBooks(tableModel);

        // Create a table and set the model
        JTable table = new JTable(tableModel);
        JScrollPane scrollPane = new JScrollPane(table);

        // Add the table to the frame
        add(scrollPane, BorderLayout.CENTER);

        // Make the frame visible
        setVisible(true);
    }

    private void fetchBorrowedBooks(DefaultTableModel tableModel) {
        String borrowedBooksSql = """
            SELECT BorrowId, PersonId, BookId, BorrowDate, ReturnDate
            FROM BBooks
            WHERE PersonId = ?
        """;
    
        try (Connection borrowedBooksConn = DriverManager.getConnection(BORROWED_BOOKS_DB_URL);
             PreparedStatement borrowedBooksStmt = borrowedBooksConn.prepareStatement(borrowedBooksSql)) {
    
            // Set the user ID parameter
            borrowedBooksStmt.setInt(1, Integer.parseInt(String.valueOf(userID)));
    
            // Execute the query
            try (ResultSet borrowedBooksRs = borrowedBooksStmt.executeQuery()) {
                // Clear the table model before populating

                tableModel.setRowCount(0);
    
                // Process the result set
                while (borrowedBooksRs.next()) {
                    int borrowId = borrowedBooksRs.getInt("BorrowId");
                    int personId = borrowedBooksRs.getInt("PersonId");
                    int bookId = borrowedBooksRs.getInt("BookId");
                    String borrowDate = borrowedBooksRs.getString("BorrowDate");
                    String returnDate = borrowedBooksRs.getString("ReturnDate");
    
                    // Fetch the book title from another table (ensure fetchBookTitle is working correctly)
                    String title = fetchBookTitle(bookId);
    
                    // Add the row to the table model
                    tableModel.addRow(new Object[]{borrowId, personId, title, borrowDate, returnDate});
                }
            }
    
        } catch (SQLException e) {
            JOptionPane.showMessageDialog(null, "Error fetching borrowed books: " + e.getMessage(),
                    "Database Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    


    private String fetchBookTitle(int bookId) {
        String bookTitle = "Unknown Title";
        String booksSql = "SELECT title FROM Books WHERE BookId = ?";

        try (Connection booksConn = DriverManager.getConnection(BOOKS_DB_URL);
             PreparedStatement booksStmt = booksConn.prepareStatement(booksSql)) {
            booksStmt.setInt(1, bookId);
            ResultSet booksRs = booksStmt.executeQuery();

            if (booksRs.next()) {
                bookTitle = booksRs.getString("title");
            }
        } catch (SQLException e) {
            System.err.println("Error fetching book title: " + e.getMessage());
        }

        return bookTitle;
    }

}

