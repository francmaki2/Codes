import java.awt.Color;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.Font;
import javax.swing.*;
import javax.swing.text.SimpleAttributeSet;
import javax.swing.text.StyleConstants;
import javax.swing.text.StyledDocument;
import java.awt.event.*;
import java.sql.SQLException;





public class AuthorGUI extends Book{
    private String username;
    private JFrame frame1;
    private JPanel panel1,panel2,panel3,panel4,panel5,panel6,panel7,panel8,panel9;
    private JTextField field1,field2,field3,field4,field5,field6;
    private JLabel label1,label2,label3;

    public AuthorGUI(String username) {
        this.username = username;  // Store the userID
    }



    public void DisplayAuth(){

    //MAIN JFRAME
    frame1 = new JFrame();
    frame1.setTitle("Author GUI");
    frame1.setSize(1200, 700);
    frame1.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    frame1.setLocationRelativeTo(null);
    frame1.setLayout(null);
    frame1.getContentPane().setBackground(Color.decode("#FCFBF4"));


//---------------------------------ADD BOOK SECTION------------------------------------------------------------------------

    //Text Field Panel!
    panel1 = new JPanel();
    panel1.setBounds(200,50,200,215);
    panel1.setLayout(new BoxLayout(panel1,BoxLayout.PAGE_AXIS));
    panel1.setBorder(BorderFactory.createEmptyBorder(10,10,10,10));
    panel1.setBackground(Color.decode("#FCFBF4"));

    frame1.add(panel1);

    field1 = createJTextField();
    field2 = createJTextField();
    field3 = createJTextField();
    field4 = createJTextField();
    field5 = createJTextField();
    panel1.add(field1);
     panel1.add(Box.createRigidArea(new Dimension(10,10)));
    panel1.add(field2);
     panel1.add(Box.createRigidArea(new Dimension(10,10)));
    panel1.add(field3);
      panel1.add(Box.createRigidArea(new Dimension(10,10)));
    panel1.add(field4);
      panel1.add(Box.createRigidArea(new Dimension(10,10)));
    panel1.add(field5);

    //Category Panel!!!
    panel2 = new JPanel();
    panel2.setBounds(10,50,200,250);
    panel2.setLayout(new BoxLayout(panel2,BoxLayout.PAGE_AXIS));
    panel2.setBorder(BorderFactory.createEmptyBorder(10,10,10,10));
    panel2.setBackground(Color.decode("#FCFBF4"));

    frame1.add(panel2);

    JTextPane text = new JTextPane();
    text.setText("Enter Book Title\nEnter Author Name\nEnter ISBN\nEnter Publication Date\nEnter Number of copies");
    text.setFont(new Font("Arial", Font.PLAIN, 16));
    text.setEditable(false); // Make it read-only
    text.setOpaque(false);

    SimpleAttributeSet attributes = new SimpleAttributeSet();
    StyleConstants.setLineSpacing(attributes, 1.2f); // Set line spacing (e.g., 0.5 = 50% extra space)
    StyledDocument doc = text.getStyledDocument();
    doc.setParagraphAttributes(0, doc.getLength(), attributes, false);

    JScrollPane scrollPane = new JScrollPane(text);
    scrollPane.getViewport().setBackground(Color.decode("#FCFBF4"));
    panel2.add(scrollPane);


    //ADD BOOK Button Panel!!!
    panel3 = new JPanel();
    panel3.setBounds(200,255,140,50);
    panel3.setLayout(new FlowLayout());
    panel3.setBorder(BorderFactory.createEmptyBorder(10,10,10,10));
    panel3.setBackground(Color.decode("#FCFBF4"));

    frame1.add(panel3);

    JButton Addbtn = new JButton("Add Book!");
    Addbtn.setFont(new Font("Arial", Font.BOLD, 16));

    Addbtn.addActionListener(new ActionListener() {
        @Override
        public void actionPerformed(ActionEvent e){
           try {
            if(field1.getText().equals("")||field2.getText().equals("")||field3.getText().equals("")||field4.getText().equals("")||field5.getText().equals("")){

              JOptionPane.showMessageDialog(null, "PLEASE ENTER ALL DATA!", "ERROR!", JOptionPane.ERROR_MESSAGE);
            }
            else{
               
                Book temp = new Book(field1.getText(), field2.getText(), field3.getText(), field4.getText(), field5.getText());
                temp.setBook(field1.getText(), field2.getText(), field3.getText(), field4.getText(), field5.getText());
                JOptionPane.showMessageDialog(null, "Book successfully Added!", "Success", JOptionPane.INFORMATION_MESSAGE);
            }
           } catch (Exception SQLException) {
            
           } 

        }
    });
    panel3.add(Addbtn);

  
    // ADD BOOK Labeling Header Panel!!!
    panel4 = new JPanel();
    panel4.setBounds(10,8,200,50);
    panel4.setLayout(new BoxLayout(panel4,BoxLayout.PAGE_AXIS));
    panel4.setBorder(BorderFactory.createEmptyBorder(10,10,10,10));
    panel4.setBackground(Color.decode("#FCFBF4"));

    frame1.add(panel4);

    label1 = new JLabel("Add Book:");
    label1.setFont(new Font("Arial", Font.BOLD, 23)); // Set font and size
    label1.setForeground(Color.BLACK);
    panel4.add(label1);


//---------------------------------REMOVE BOOK SECTION------------------------------------------------------------------------

    //Remove Book Text Field Panel!
    panel5 = new JPanel();
    panel5.setBounds(110,365,200,50);
    panel5.setLayout(new BoxLayout(panel5,BoxLayout.PAGE_AXIS));
    panel5.setBorder(BorderFactory.createEmptyBorder(10,10,10,10));
    panel5.setBackground(Color.decode("#FCFBF4"));
 
    frame1.add(panel5);
 
    field6 = createJTextField();

    panel5.add(field6);


    //REMOVE BOOK BUTTON
    panel7 = new JPanel();
    panel7.setBounds(110,405,170,50);
    panel7.setLayout(new FlowLayout());
    panel7.setBorder(BorderFactory.createEmptyBorder(10,10,10,10));
    panel7.setBackground(Color.decode("#FCFBF4"));

    frame1.add(panel7);

    JButton removebtn = new JButton("Remove Book!");
    removebtn.setFont(new Font("Arial", Font.BOLD, 16));

    removebtn.addActionListener(new ActionListener() {
        @Override
        public void actionPerformed(ActionEvent z) {
            try {
                if (field6.getText().equals("")) { // Check if the field is empty
                    JOptionPane.showMessageDialog(null, "PLEASE ENTER ISBN TO REMOVE!", "ERROR", JOptionPane.ERROR_MESSAGE);
                } else {
                    Book temp = new Book(); // Create a Book object
                    temp.removeBook(field6.getText()); // Call removeBook with the trimmed input
                    JOptionPane.showMessageDialog(null, "Book successfully removed!", "Success", JOptionPane.INFORMATION_MESSAGE);
                }
            } catch (SQLException e) { // Handle SQL exceptions
                JOptionPane.showMessageDialog(null, "Error removing book: " + e.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
            }
        }
    });
    panel7.add(removebtn);


    //REMOVE BOOK HEADER LABEL
    panel6 = new JPanel();
    panel6.setBounds(10,325,200,100);
    panel6.setLayout(new BoxLayout(panel6,BoxLayout.PAGE_AXIS));
    panel6.setBorder(BorderFactory.createEmptyBorder(10,10,10,10));
    panel6.setBackground(Color.decode("#FCFBF4"));

    frame1.add(panel6);

    label2 = new JLabel("Remove Book:");
    label2.setFont(new Font("Arial", Font.BOLD, 23)); // Set font and size
    label2.setForeground(Color.BLACK);
    panel6.add(label2);

    panel6.add(Box.createRigidArea(new Dimension(10,15)));

    label3 = new JLabel("Enter ISBN");
    label3.setFont(new Font("Arial", Font.PLAIN, 16)); // Set font and size
    label3.setForeground(Color.BLACK);
    panel6.add(label3);


//-----------------------------------------DISPLAY BOOKS TABLE-----------------------------------------------
        panel8 = new JPanel();
        panel8.setBounds(110, 500, 200, 50);
        panel8.setLayout(new FlowLayout());
        panel8.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        panel8.setBackground(Color.decode("#FCFBF4"));
        frame1.add(panel8);

        JButton DispBookTable = new JButton("Display Books Table");
        DispBookTable.setFont(new Font("Arial", Font.BOLD, 16));

        // Action Listener to Display Books
        DispBookTable.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent x) {
                BookTableGUI.displayBookTable();
            }
        });
        panel8.add(DispBookTable);



//------------------------------------------DISPLAY AUTHORED TABLE----------------------------------------------
        panel9 = new JPanel();
        panel9.setBounds(300, 500, 300, 50);
        panel9.setLayout(new FlowLayout());
        panel9.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        panel9.setBackground(Color.decode("#FCFBF4"));
        frame1.add(panel9);

        JButton DispAuthorTable = new JButton("Display Authored Books Table");
        DispAuthorTable.setFont(new Font("Arial", Font.BOLD, 16));

        // Action Listener to Display Books
        DispAuthorTable.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent v) {
                AuthorTableGUI temp = new AuthorTableGUI();
                temp.displayAuthorTable(username);
            }
        });
        panel9.add(DispAuthorTable);





    //makes all the GUI visible
    frame1.setVisible(true);
    }

    //CREATE TEXT FIELD METHOD
    public JTextField createJTextField(){
        JTextField field = new JTextField(10);

        return field;
    }




}
     
