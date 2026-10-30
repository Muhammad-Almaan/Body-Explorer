from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

# Heart information data
HEART_INFO = {
    'welcome': {
        'title': 'Welcome! 💓',
        'description': 'Your heart is an amazing muscle that never stops working. It pumps blood throughout your entire body, delivering oxygen and nutrients to every cell!',
        'facts': [
            'Beats 100,000 times per day',
            'Pumps 2,000 gallons of blood daily',
            'About the size of your fist',
            'Has 4 chambers that work together'
        ]
    },
    'right-atrium': {
        'title': 'Right Atrium',
        'description': 'This chamber receives oxygen-poor blood from your body through the vena cava. Think of it as the "receiving room" for tired blood that needs fresh oxygen!',
        'facts': [
            'Receives blood from the body',
            'Contracts to push blood down',
            'Has thinner walls than ventricles'
        ]
    },
    'right-ventricle': {
        'title': 'Right Ventricle',
        'description': 'The right ventricle pumps oxygen-poor blood to your lungs where it picks up fresh oxygen. It\'s like a delivery truck taking blood to the oxygen station!',
        'facts': [
            'Pumps blood to lungs',
            'Has thicker walls for pumping',
            'Works with right atrium'
        ]
    },
    'left-atrium': {
        'title': 'Left Atrium',
        'description': 'This chamber receives oxygen-rich blood from your lungs. It\'s the "collection point" for freshly oxygenated blood ready to energize your body!',
        'facts': [
            'Receives oxygenated blood from lungs',
            'Smaller than left ventricle',
            'Contracts after right atrium'
        ]
    },
    'left-ventricle': {
        'title': 'Left Ventricle',
        'description': 'The strongest chamber! It pumps oxygen-rich blood to your entire body through the aorta. This powerful pump has the thickest walls because it has the biggest job!',
        'facts': [
            'Pumps blood to entire body',
            'Thickest, strongest chamber',
            'Creates blood pressure'
        ]
    },
    'aorta': {
        'title': 'Aorta',
        'description': 'The body\'s main highway! This is the largest artery that carries oxygen-rich blood from the left ventricle to the rest of your body.',
        'facts': [
            'Largest blood vessel',
            'Carries oxygenated blood',
            'Branches throughout body'
        ]
    }
}

# Brain information data
BRAIN_INFO = {
    'welcome': {
        'title': 'Welcome! 🧠',
        'description': 'Your brain is the most complex organ in your body, containing 86 billion neurons that control everything you do, think, and feel!',
        'facts': [
            'Contains 86 billion neurons',
            'Uses 20% of your body\'s energy',
            'Processes information at 268 mph',
            'Generates 25 watts of power'
        ]
    },
    'frontal': {
        'title': 'Frontal Lobe',
        'description': 'The frontal lobe is like your brain\'s CEO! It helps you make decisions, solve problems, plan for the future, and controls your personality and emotions.',
        'facts': [
            'Controls decision-making',
            'Manages personality and behavior',
            'Handles problem-solving',
            'Controls voluntary movements'
        ]
    },
    'parietal': {
        'title': 'Parietal Lobe',
        'description': 'This region processes touch, temperature, and pain. It helps you understand where your body is in space and processes sensory information from all over your body!',
        'facts': [
            'Processes touch and pressure',
            'Spatial awareness',
            'Integrates sensory information',
            'Helps with math and reading'
        ]
    },
    'temporal': {
        'title': 'Temporal Lobe',
        'description': 'Your temporal lobe is the brain\'s hearing center! It processes sounds, helps you understand language, and stores memories.',
        'facts': [
            'Processes hearing and sound',
            'Stores memories',
            'Recognizes faces',
            'Understands language'
        ]
    },
    'occipital': {
        'title': 'Occipital Lobe',
        'description': 'The occipital lobe is your vision headquarters! Everything you see is processed here, from colors to shapes to movement.',
        'facts': [
            'Processes visual information',
            'Recognizes colors and shapes',
            'Detects movement',
            'Creates visual memories'
        ]
    },
    'cerebellum': {
        'title': 'Cerebellum',
        'description': 'The cerebellum is your balance and coordination expert! It helps you walk smoothly, catch a ball, and perform any movement that requires precision.',
        'facts': [
            'Controls balance',
            'Coordinates movements',
            'Helps with motor learning',
            'Fine-tunes muscle actions'
        ]
    },
    'brainstem': {
        'title': 'Brain Stem',
        'description': 'The brain stem is your survival center! It controls essential automatic functions like breathing, heart rate, and sleep cycles - things you don\'t have to think about!',
        'facts': [
            'Controls breathing',
            'Regulates heart rate',
            'Manages sleep cycles',
            'Connects brain to spinal cord'
        ]
    }
}

# Quiz questions
HEART_QUIZ = [
    {
        'question': 'How many chambers does the heart have?',
        'options': ['2 chambers', '3 chambers', '4 chambers', '5 chambers'],
        'correct': 2
    },
    {
        'question': 'What does the heart pump throughout your body?',
        'options': ['Air', 'Blood', 'Water', 'Food'],
        'correct': 1
    },
    {
        'question': 'About how many times does your heart beat per day?',
        'options': ['10,000 times', '50,000 times', '100,000 times', '200,000 times'],
        'correct': 2
    },
    {
        'question': 'Where does blood go after leaving the right ventricle?',
        'options': ['Brain', 'Lungs', 'Stomach', 'Feet'],
        'correct': 1
    },
    {
        'question': 'What is the largest blood vessel leaving the heart?',
        'options': ['Aorta', 'Vena Cava', 'Pulmonary Artery', 'Carotid Artery'],
        'correct': 0
    }
]

BRAIN_QUIZ = [
    {
        'question': 'How many neurons does the brain contain?',
        'options': ['1 billion', '10 billion', '86 billion', '200 billion'],
        'correct': 2
    },
    {
        'question': 'Which part of the brain controls balance and coordination?',
        'options': ['Frontal lobe', 'Cerebellum', 'Occipital lobe', 'Brain stem'],
        'correct': 1
    },
    {
        'question': 'What percentage of your body\'s energy does the brain use?',
        'options': ['5%', '10%', '20%', '30%'],
        'correct': 2
    },
    {
        'question': 'Which lobe is responsible for vision?',
        'options': ['Frontal lobe', 'Temporal lobe', 'Parietal lobe', 'Occipital lobe'],
        'correct': 3
    },
    {
        'question': 'What does the frontal lobe help control?',
        'options': ['Vision', 'Hearing', 'Decision-making and personality', 'Balance'],
        'correct': 2
    }
]

@app.route('/')
def index():
    """Home page route"""
    return render_template('index.html')

@app.route('/heart')
def heart():
    """Heart page route"""
    return render_template('heart.html', heart_info=HEART_INFO, quiz=HEART_QUIZ)

@app.route('/brain')
def brain():
    """Brain page route"""
    return render_template('brain.html', brain_info=BRAIN_INFO, quiz=BRAIN_QUIZ)

@app.route('/api/heart-info/<part>')
def get_heart_info(part):
    """API endpoint for heart information"""
    return jsonify(HEART_INFO.get(part, HEART_INFO['welcome']))

@app.route('/api/brain-info/<part>')
def get_brain_info(part):
    """API endpoint for brain information"""
    return jsonify(BRAIN_INFO.get(part, BRAIN_INFO['welcome']))

if __name__ == '__main__':
    app.run(debug=False, port=5000)