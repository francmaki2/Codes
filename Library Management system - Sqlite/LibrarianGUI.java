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





public class LibrarianGUI extends Book{
    private JFrame frame1;
    private JPanel panel1,panel2,panel3,panel4,panel5,panel6,panel7,panel8,panel9,panel10,panel11,panel12,panel13,panel14,panel15,panel16;
    private JTextField field1,field2,field3,field4,field5,field6,field7,field8,field9;
    private JLabel label1,label2,label3,label4,label5,label6;



    public void DisplayLib(){

    //MAIN JFRAME
    frame1 = new JFrame();
    frame1.setTitle("Librarian GUI");
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






//------------------------------------------DISPLAY BOOKS TABLE----------------------------------------------
    panel8 = new JPanel();
    panel8.setBounds(110,500,200,50);
    panel8.setLayout(new FlowLayout());
    panel8.setBorder(BorderFactory.createEmptyBorder(10,10,10,10));
    panel8.setBackground(Color.decode("#FCFBF4"));

    frame1.add(panel8);

    JButton DispBookTable = new JButton("Display Books Table");
    DispBookTable.setFont(new Font("Arial", Font.BOLD, 16));

    DispBookTable.addActionListener(new ActionListener() {
        @Override
        public void actionPerformed(ActionEvent x) {
            BookTableGUI.displayBookTable();
        }
    });
    panel8.add(DispBookTable);




//-----------------------------------DISPLAY PERSONS TABLE-------------------------------------------

    panel9 = new JPanel();
    panel9.setBounds(325,500,200,50);
    panel9.setLayout(new FlowLayout());
    panel9.setBorder(BorderFactory.createEmptyBorder(10,10,10,10));
    panel9.setBackground(Color.decode("#FCFBF4"));

    frame1.add(panel9);

    JButton DispPersonTable = new JButton("Display Person Table");
    DispPersonTable.setFont(new Font("Arial", Font.BOLD, 16));

    DispPersonTable.addActionListener(new ActionListener() {
        @Override
        public void actionPerformed(ActionEvent y) {
            PersonTableGUI.DisplayPersonTable();
        }
    });
    panel9.add(DispPersonTable);




//-------------------------------ADD PERSON SECTION----------------------------------------------

   //Text Field Panel!
   panel10 = new JPanel();
   panel10.setBounds(600,50,200,90);
   panel10.setLayout(new BoxLayout(panel10,BoxLayout.PAGE_AXIS));
   panel10.setBorder(BorderFactory.createEmptyBorder(10,10,10,10));
   panel10.setBackground(Color.decode("#FCFBF4"));

   frame1.add(panel10);

   field7 = createJTextField();
   field8 = createJTextField();
   

   panel10.add(field7);
    panel10.add(Box.createRigidArea(new Dimension(10,10)));
   panel10.add(field8);

 

   //Category Panel!!!
   panel11 = new JPanel();
   panel11.setBounds(410,50,200,115);
   panel11.setLayout(new BoxLayout(panel11,BoxLayout.PAGE_AXIS));
   panel11.setBorder(BorderFactory.createEmptyBorder(10,10,10,10));
   panel11.setBackground(Color.decode("#FCFBF4"));

   frame1.add(panel11);

   JTextPane text1 = new JTextPane();
   text1.setText("Enter Person Name\nEnter Person Field");
   text1.setFont(new Font("Arial", Font.PLAIN, 16));
   text1.setEditable(false); // Make it read-only
   text1.setOpaque(false);

   SimpleAttributeSet attributes1 = new SimpleAttributeSet();
   StyleConstants.setLineSpacing(attributes1, 1.2f); // Set line spacing (e.g., 0.5 = 50% extra space)
   StyledDocument doc1 = text1.getStyledDocument();
   doc1.setParagraphAttributes(0, doc1.getLength(), attributes1, false);

   JScrollPane scrollPane11 = new JScrollPane(text1);
   scrollPane11.getViewport().setBackground(Color.decode("#FCFBF4"));
   panel11.add(scrollPane11);


   //ADD PERSON Button Panel!!!
   panel12 = new JPanel();
   panel12.setBounds(610,130,140,50);
   panel12.setLayout(new FlowLayout());
   panel12.setBorder(BorderFactory.createEmptyBorder(10,10,10,10));
   panel12.setBackground(Color.decode("#FCFBF4"));

   frame1.add(panel12);

   JButton Addbtn1 = new JButton("Add Person!");
   Addbtn1.setFont(new Font("Arial", Font.BOLD, 16));

   Addbtn1.addActionListener(new ActionListener() {
       @Override
       public void actionPerformed(ActionEvent w){
          try {
           if(field7.getText().equals("")||field8.getText().equals("")){

             JOptionPane.showMessageDialog(null, "PLEASE ENTER ALL DATA!", "ERROR!", JOptionPane.ERROR_MESSAGE);
           }
           else{
              
                Person temp = new Person(field7.getText(), field8.getText());
                temp.setPerson(field7.getText(), field8.getText());
                JOptionPane.showMessageDialog(null, "Person successfully Added!", "Success", JOptionPane.INFORMATION_MESSAGE);
           }
          } catch (Exception SQLException) {
           
          } 

       }
   });
   panel12.add(Addbtn1);

 
   // ADD PERSON Labeling Header Panel!!!
   panel13 = new JPanel();
   panel13.setBounds(410,8,300,50);
   panel13.setLayout(new BoxLayout(panel13,BoxLayout.PAGE_AXIS));
   panel13.setBorder(BorderFactory.createEmptyBorder(10,10,10,10));
   panel13.setBackground(Color.decode("#FCFBF4"));

   frame1.add(panel13);

   label4 = new JLabel("Add Person:");
   label4.setFont(new Font("Arial", Font.BOLD, 23)); // Set font and size
   label4.setForeground(Color.BLACK);
   panel13.add(label4);





//---------------------------------REMOVE PERSON SECTION------------------------------------------------------------------------

    //Remove PERSON Text Field Panel!
    panel14 = new JPanel();
    panel14.setBounds(580,365,200,50);
    panel14.setLayout(new BoxLayout(panel14,BoxLayout.PAGE_AXIS));
    panel14.setBorder(BorderFactory.createEmptyBorder(10,10,10,10));
    panel14.setBackground(Color.decode("#FCFBF4"));
 
    frame1.add(panel14);
 
    field9 = createJTextField();

    panel14.add(field9);


    //REMOVE PERSON BUTTON
    panel15 = new JPanel();
    panel15.setBounds(590,405,170,50);
    panel15.setLayout(new FlowLayout());
    panel15.setBorder(BorderFactory.createEmptyBorder(10,10,10,10));
    panel15.setBackground(Color.decode("#FCFBF4"));

    frame1.add(panel15);

    JButton removebtn1 = new JButton("Remove Person!");
    removebtn1.setFont(new Font("Arial", Font.BOLD, 16));

    removebtn1.addActionListener(new ActionListener() {
        @Override
        public void actionPerformed(ActionEvent z) {
            try {
                if (field9.getText().equals("")) { // Check if the field is empty
                    JOptionPane.showMessageDialog(null, "PLEASE ENTER PERSONID TO REMOVE!", "ERROR", JOptionPane.ERROR_MESSAGE);
                } else {
                    Person temp = new Person(); // Create a Book object
                    temp.removePerson(field9.getText()); // Call removeBook with the trimmed input
                    JOptionPane.showMessageDialog(null, "Person successfully removed!", "Success", JOptionPane.INFORMATION_MESSAGE);
                }
            } catch (SQLException e) { // Handle SQL exceptions
                JOptionPane.showMessageDialog(null, "Error removing Person: " + e.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
            }
        }
    });
    panel15.add(removebtn1);


    //REMOVE PERSON HEADER LABEL
    panel16 = new JPanel();
    panel16.setBounds(410,325,350,100);
    panel16.setLayout(new BoxLayout(panel16,BoxLayout.PAGE_AXIS));
    panel16.setBorder(BorderFactory.createEmptyBorder(10,10,10,10));
    panel16.setBackground(Color.decode("#FCFBF4"));

    frame1.add(panel16);

    label5 = new JLabel("Remove Person:");
    label5.setFont(new Font("Arial", Font.BOLD, 23)); // Set font and size
    label5.setForeground(Color.BLACK);
    panel16.add(label5);

    panel16.add(Box.createRigidArea(new Dimension(10,15)));

    label6 = new JLabel("       Enter PersonID");
    label6.setFont(new Font("Arial", Font.PLAIN, 16)); // Set font and size
    label6.setForeground(Color.BLACK);
    panel16.add(label6);










    //makes all the GUI visible
    frame1.setVisible(true);
    }

    //CREATE TEXT FIELD METHOD
    public JTextField createJTextField(){
        JTextField field = new JTextField(10);

        return field;
    }




}
     
