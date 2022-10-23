import functools as ft
from scipy import stats
import random
import math
import numpy as np
import pandas as pd
import networkx as nx
import matplotlib.pyplot as plt
import time
import subprocess
import os
import sys
import argparse 
from datetime import datetime
import tqdm
import pylab as plb
import multiprocessing as mp
import shutil

def main():
    # read flights-new.csv
    df = pd.read_csv('./flights-new.csv')
    # delete columns date, time
    df = df.drop(['date', 'time'], axis=1)
    # save
    df.to_csv('flights-new-dropped.csv', index=False)

if __name__ == '__main__':
    main() 