#include <iostream>
#include <string>
#include "RFModuleReader.h"
double getRFModuleData() {
  return (double)rand()/(RAND_MAX + 1)+12+(rand()%4);
}