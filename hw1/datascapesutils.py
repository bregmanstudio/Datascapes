# datascapesutils - a collection of helper functions to assist in visualizing and sonifying data

import pylab as pl
import bregman.suite as br
import numpy as np

kp_epd = 8 # events per day
kp_evy = kp_epd*365.25 # events per year
kp_ev_map = {'d':kp_epd,'m':kp_evy/12,'12m':kp_evy,'w':kp_epd*7} # events per time-period

# Modal lookup tables (expressed in half-steps from the tonic)
modes = {
	'major': [0, 2, 4, 5, 7, 9, 11], # melody notes move step-wise
	'major_bass': [0, 7, 2, 9, 4, 11, 5], # bass notes move by circle of fifths
	'minor': [0, 2, 3, 5, 7, 8, 11], # harmonic minor key 
	'minor_bass': [0, 7, 2, 8, 3, 11, 5] # harmonic minor key bass (circle of fifths) 
}

# The synthesizer, uses Bregman's harmonics() function to lookup an additive synth model
def make_note(note=0, amp=1.0, dur=1.0, base_freq=440.0, **params):
	"""
	A simple computer music instrument (CMI).

	inputs:
		note - 1/2 step pitch indx from A440 [0]
		 amp - amplitude of the sound [1.0]
		 dur - duration of the sound (seconds) [1.0]
	"""
	params.setdefault('num_harmonics',10)
	params.setdefault('sample_rate',44100)
	params.setdefault('num_points', int(round(dur*params['sample_rate'])))
	w = np.hanning(88)
	wn = len(w) // 2.0
	h = amp * br.harmonics(f0=base_freq*2**(note/12.0), **params)
	h[:wn] = h[:wn] * w[:wn]
	h[-wn:] = h[-wn:] * w[-wn:]
	return h

def mode_map(n, mode=modes['major']):    
	"""
	Perform the mapping from an integer scale degree to a modal interval
	"""
	n = int(round(n)) 
	pc = n%len(mode)
	octave = n//len(mode)
	return mode[pc] + octave*12

# Perform the resampling in time (by taking the mean or median) and map to musical scale
def map_pitch(x, rule='12m', how='mean', mode=modes['major']):
	"""
	Map an integer (x) to a lookup table (mode).
	"""
	x2 = x.resample(rule, how, closed='left')
	for i, v in enumerate(x2):
		x2.iloc[i] = mode_map(v, mode)
	return x2

# Perform the audio synthesis, returning an audio signal
def synthesize(x, dur=1.0, f0=220.0, **params):
	"""
	Convert a series of note values into an audio signal.
	inputs:
		x - list or time series of pitch 1/2-step offsets to sonify
		dur - length of each note [1.0 seconds], or array of lengths for notes in x
		f0 - reference pitch for 1/2-step offsets [220 Hz]
		**params - key-word arguments for harmonics() function [testsignal.default_params()]
	outputs:
		array - audio rate time series
	"""
	snd = [make_note(n, 1.0, dur, base_freq=f0, **params) for n in x]
	return br.balance_signal(np.hstack(snd))

def image_to_spectrum(data, **kwargs):
	"""
	Make a spectrum object (LinearFrequencySpectrum) that will have the correct dimensions for the given image.
	inputs:
		data - 2D or 3D (RGB) data array, organized as Height x Width [x channels]
	outputs:
		BregmanToolkit spectrogram object
	"""
	if len(data.shape)==3:
		data = data.copy()
		data = data.mean(2)
	imHeight, imWidth = data.shape
	nF = int(2**(np.ceil(np.log2(imHeight))+1)) # Make the spectrum size at least double the image height
	nsamps = int(np.ceil(imWidth * nF/4)) # Calculate number of imWidth frames x nF/4
	print nF, nsamps, nsamps/(nF/4)
	spec = br.LinearFrequencySpectrum(pl.randn(nsamps), nfft=nF, wfft=nF/2, nhop=nF/4, **kwargs)
	spec.STFT[:imHeight,:imWidth] = data * np.exp(-1j*np.angle(spec.STFT[:imHeight,:imWidth]))
	spec.X[:imHeight,:imWidth] = data
	return spec

def image_to_logspectrum(data, **kwargs):
	"""
	Make a log frequency spectrum object (LogFrequencySpectrum) that will have the correct dimensions for the given image.
	inputs:
		data - 2D or 3D (RGB) data array, organized as Height x Width [x channels]
	outputs:
		BregmanToolkit log spectrogram object
	"""
	if len(data.shape)==3:
		data = data.copy()
		data = data.mean(2)
	imHeight, imWidth = data.shape
	nF = kwargs.pop('nfft',2048)
	nB = kwargs.pop('nbpo',int(np.ceil(imHeight//7))) # Make the bands per octave the image height / 7 octaves
	nsamps = int(np.ceil(imWidth * nF/4)) # Calculate  
	print nF, nsamps, nsamps/(nF/4)
	spec = br.LogFrequencySpectrum(pl.randn(nsamps), nfft=nF, wfft=nF/2, nhop=nF/4, nbpo=nB, **kwargs)
	spec.STFT[:imHeight,:imWidth] = data * np.exp(-1j*np.angle(spec.STFT[:imHeight,:imWidth]))
	spec.X[:imHeight,:imWidth] = data
	return spec

