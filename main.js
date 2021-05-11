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
# Visualization
import matplotlib.pyplot as plt
import seaborn as sns
# Display all cell outputs
from IPython.core.interactiveshell import InteractiveShell
InteractiveShell.ast_node_interactivity = 'all'
`);
        //Jupyter.notebook.execute_cell_and_select_below();
};
        var data_preprocessing_cell=function(){
            Jupyter.notebook.insert_cell_above('code').
            set_text(`#This cell is for data preprocessing
df=pd.read_csv('Data.csv')
x=df.iloc[:,:-1].values #dependent_variables
y=df.iloc[:,len(df.coloumns)-1].values #independent_variables

#handling missing data
#from sklearn.preprocessing import Imputer
#imputer=Imputer(missing_values='NaN', strategy='mean', axis=0)
#imputer=imputer.fit(x[:,:])
#x[:,:]=imputer.transform(x[:,:])

#encoding categorical data
from sklearn.preprocessing import LabelEncoder,OneHotEncoder
#le=LabelEncoder()
#x=[:,0]=le.fit_transform(x[[:,0]])

#ohe=OneHotEncoder(categorical_features=[0])
#x=ohe.fit_transform(x).toarray()
            
# Splitting the dataset into Training Set and Test set
from sklearn.cross_validation import train_test_split
X_train,X_test, y_train, y_test = train_test_split(x,y,test_size = ,random_state=0)
            
# Feature Scaling
#from sklearn.preprocessing import StandardScaler
#sc_X = StandardScaler()
#X_train = sc_X.fit_transform(X_train)
#X_test = sc_X.transform(X_test)
`);
        };
        var regression_cell=function(){
            Jupyter.notebook.insert_cell_above('code').
            set_text(`#This cell is for regression algorithms

#from sklearn.linear_model import LinearRegression
#from sklearn.preprocessing import PolynomialFeatures

#for simple linear regression and multiple linear regression
#regressor=LinearRegression()
#regressor.fit(x_train, y_train)
#y_pred=regressor.predict(x_test)

#for polynomial linear regression
#poly = PolynomialFeatures(degree='num')
#x1 = poly.fit_transform(x)
#lin_reg2=LinearRegression()
#lin_reg2.fit(x1,y)
#lin_reg2.predict(poly.fit_transform([['value]]))

#svr
#from sklearn.svm import SVR
#regressor = SVR(kernel = 'rbf')
#regressor.fit(x, y)
#y_pred=regressor.predict([['value']])

#decision tree
#from sklearn.tree import DecisionTreeRegressor
#regressor=DecisionTreeRegressor(random_state=0)
#regressor.fit(x,y)
#y_pred=regressor.predict([['value']])

#random forest
#from sklearn.ensemble import RandomForestRegressor
#regressor=RandomForestRegressor(n_estimators=1000, random_state=0)
#regressor.fit(x,y.ravel())
#y_pred=regressor.predict([['value']])
`);
        };
        var classification_cell=function(){
            Jupyter.notebook.insert_cell_above('code').
            set_text(`#This cell is for classification algorithms



`);
        }
      // Button to add default cell
      var defaultCellButton = function () {
          Jupyter.toolbar.add_buttons_group([
              Jupyter.keyboard_manager.actions.register ({
                  'help': 'Add preset functions cell',
                  'icon' : 'fa-magic',
                  'handler': function(){
                      libraries_cell();
                      data_preprocessing_cell();
                      regression_cell();
                      classification_cell();
                  }
              }, 'add-ml-preset-cell', 'Preset cell')
          ])
      }
    // Run on start
    function load_ipython_extension() {
        // Add a default cell if there are no cells
        if (defaultCellButton()){
            libraries_cell();
            data_preprocessing_cell();
            regression_cell();
            classification_cell();
        }
        
    }
    return {
        load_ipython_extension: load_ipython_extension
    };
});