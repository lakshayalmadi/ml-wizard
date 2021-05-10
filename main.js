define([
    'base/js/namespace',
    'base/js/events'
    ], function(Jupyter, events) {

        // Adds a cell above current cell (will be top if no cells)
        var libraries_cell = function() {
        Jupyter.notebook.insert_cell_above('code').
        // Define default cell here
        set_text(`# Standard data science libraries
                    import pandas as pd
                    import numpy as np
                    from scipy import stats
                    import featuretools as ft
                    # Visualization
                    import matplotlib.pyplot as plt
                    import seaborn as sns
                    # Display all cell outputs
                    from IPython.core.interactiveshell import InteractiveShell
                    InteractiveShell.ast_node_interactivity = 'all'
                    `);
        Jupyter.notebook.select_prev();
        //Jupyter.notebook.execute_cell_and_select_below();
        };
        var data_preprocessing_cell=function(){
            Jupyter.notebook.insert_cell_above('code').
            set_text(`#This cell is for data preprocessing
            df=pd.read_csv('Data.csv')
            x=df.iloc[:,:-1].values #dependent_variables
            y=df.iloc[:,3].values #independent_variables
            
            # Splitting the dataset into Training Set and Test set
            from sklearn.cross_validation import train_test_split
            X_train,X_test, y_train, y_test = train_test_split(X,y,test_size=0.2,random_state=0)
            
            # Feature Scaling
            from sklearn.preprocessing import StandardScaler
            sc_X = StandardScaler()
            X_train = sc_X.fit_transform(X_train)
            X_test = sc_X.transform(X_test)
            `);
        }
      // Button to add default cell
      var defaultCellButton = function () {
          Jupyter.toolbar.add_buttons_group([
              Jupyter.keyboard_manager.actions.register ({
                  'help': 'Add preset functions cell',
                  'icon' : 'fa-play-circle',
                  'handler': libraries_cell
              }, 'add-default-cell', 'Preset cell')
          ])
      }
    // Run on start
    function load_ipython_extension() {
        // Add a default cell if there are no cells
        if (Jupyter.notebook.get_cells().length===1){
            libraries_cell();
        }
        else if(Jupyter.notebook.get_cells().length===2){
            data_preprocessing_cell();
        }
        defaultCellButton();
    }
    return {
        load_ipython_extension: load_ipython_extension
    };
});