#include <iostream>
 
using namespace std;
 
int main(){
    int p = 0, q = 0, w = 0;
    cin >> p >> q >> w;

    for (int i = 1; i * p <= w; i++){  
         if ((w - (i * p)) % q == 0){
             cout << i << " " << (w - (i * p)) / q << endl;
             break;
         }
    }
     return 0;
}