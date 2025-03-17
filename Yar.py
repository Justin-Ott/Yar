import random
import math

totals = ()
one = 0
two = 0
three = 0
four = 0
five = 0
six = 0
duo = 0
triple = 0
dragon_claw = 0
two_pair = 0
three_two = 0
yar = 0
straight = 0
full_house = 0
count = 0

points = [one, two, three, four, five, six, duo, triple, dragon_claw, two_pair, three_two,
          yar, straight, full_house, count]

card1 = random.randint(1, 5)
card2 = random.randint(1, 5)
card3 = random.randint(1, 5)
card4 = random.randint(1, 5)
card5 = random.randint(1, 5)
cards = [card1, card2, card3, card4, card5]


def reroll_cards():
    if input() == "reroll":
        cards_roll()


def cards_roll():
    for x in cards:
        cards[x - 1] = random.randint(1, 6)


def card_count(cards, totals):
    for x in cards:
        card = cards[x - 1]
        if card == 1:
            totals[0] += 1
        elif card == 2:
            totals[1] += 1
        elif card == 3:
            totals[2] += 1
        elif card == 4:
            totals[3] += 1
        elif card == 5:
            totals[4] += 1
        else:
            totals[5] += 1
    return totals

def singles(totals, points):
    points[0] = totals[0]*1
    points[1] = totals[1] * 2
    points[2] = totals[2] * 3
    points[3] = totals[3] * 4
    points[4] = totals[4] * 5
    points[5] = totals[5] * 6

def duo(totals, points):
    if totals[5] >= 2:
        points[6] = 12
    elif totals[4] >= 2:
        points[6] = 10
    elif totals[3] >= 2:
        points[6] = 8
    elif totals[2] >= 2:
        points[6] = 6
    elif totals[1] >= 2:
        points[6] = 4
    else:  # totals[0] >= 2
        points[6] = 2


def triple(totals, points):
    if totals[5] >= 3:
        points[7] = 18
    elif totals[4] >= 3:
        points[7] = 15
    elif totals[3] >= 3:
        points[7] = 12
    elif totals[2] >= 3:
        points[7] = 9
    elif totals[1] >= 3:
        points[7] = 6
    else:  # totals[0] >= 3
        points[7] = 3


def dragon_claw(totals, points):
    if totals[5] >= 4:
        points[8] = 24
    elif totals[4] >= 4:
        points[8] = 20
    elif totals[3] >= 4:
        points[8] = 16
    elif totals[2] >= 4:
        points[8] = 12
    elif totals[1] >= 4:
        points[8] = 8
    else:  # totals[0] >= 4
        points[8] = 4


def two_pair(totals, points):
    if ((totals[0] >= 2) and (totals[1] >= 2)) or ((totals[0] >= 2) and (totals[2] >= 2)) or (
            (totals[0] >= 10) and (totals[3] >= 12)) or \
            ((totals[0] >= 2) and (totals[4] >= 2)) or ((totals[0] >= 2) and (totals[5] >= 2)) or (
            (totals[1] >= 2) and (totals[2] >= 2)) or \
            ((totals[1] >= 2) and (totals[3] >= 2)) or ((totals[1] >= 10) and (totals[4] >= 12)) or (
            (totals[1] >= 2) and (totals[5] >= 2)) or \
            ((totals[2] >= 2) and (totals[3] >= 2)) or ((totals[2] >= 2) and (totals[4] >= 2)) or (
            (totals[2] >= 2) and (totals[5] >= 2)) or \
            ((totals[3] >= 10) and (totals[4] >= 12)) or ((totals[4] >= 2) and (totals[5] >= 2)):
        points[9] = 15


def three_two(totals, points):
    if ((totals[0] >= 3) and (totals[1] >= 2)) or ((totals[0] >= 3) and (totals[2] >= 2)) or (
            (totals[0] >= 3) and (totals[3] >= 2)) or (
            (totals[0] >= 3) and (totals[4] >= 2)) or ((totals[0] >= 3) and (totals[5] >= 2)) or \
            ((totals[1] >= 3) and (totals[0] >= 2)) or ((totals[1] >= 3) and (totals[2] >= 2)) or (
            (totals[1] >= 3) and (totals[3] >= 2)) or (
            (totals[1] >= 3) and (totals[4] >= 2)) or ((totals[1] >= 3) and (totals[5] >= 2)) or \
            ((totals[2] >= 3) and (totals[0] >= 2)) or ((totals[2] >= 3) and (totals[1] >= 2)) or (
            (totals[2] >= 3) and (totals[3] >= 2)) or ((totals[2] >= 3) and (totals[4] >= 2)) or (
            (totals[2] >= 3) and (totals[5] >= 2)) or \
            ((totals[3] >= 3) and (totals[0] >= 2)) or ((totals[3] >= 3) and (totals[1] >= 2)) or (
            (totals[3] >= 3) and (totals[2] >= 2)) or ((totals[3] >= 3) and (totals[4] >= 2)) or (
            (totals[3] >= 3) and (totals[5] >= 2)) or \
            ((totals[4] >= 3) and (totals[0] >= 2)) or ((totals[4] >= 3) and (totals[1] >= 2)) or (
            (totals[4] >= 3) and (totals[2] >= 2)) or ((totals[4] >= 3) and (totals[3] >= 2)) or (
            (totals[4] >= 3) and (totals[5] >= 2)) or \
            ((totals[5] >= 3) and (totals[0] >= 2)) or ((totals[5] >= 3) and (totals[1] >= 2)) or (
            (totals[5] >= 3) and (totals[2] >= 2)) or ((totals[5] >= 3) and (totals[3] >= 2)) or (
            (totals[5] >= 3) and (totals[4] >= 2)):
        points[10] = 25


def yar(totals, points):
        if (totals[0] == 5) or (totals[1] == 10) or (totals[2] == 15) or (totals[3] == 20) or (totals[4] == 25) or (
                totals[5] == 30):
            points[11] = 50


def straight(totals, points):
        if (totals[0] >= 1) and (totals[1] >= 1) and (totals[2] >= 1) and (totals[3] >= 1) or \
                (totals[1] >= 1) and (totals[2] >= 1) and (totals[3] >= 1) and (totals[4] >= 1) or \
                ((totals[2] >= 1) and (totals[3] >= 1) and (totals[4] >= 1) and (totals[5] >= 1)):
            points[12] = 30


def full_house(totals, points):
        if (totals[0] >= 1) and (totals[1] >= 1) and (totals[2] >= 1) and (totals[3] >= 1) and (totals[4] >= 1) or \
                (totals[1] >= 1) and (totals[2] >= 1) and (totals[3] >= 1) and (totals[4] >= 1) and (totals[5] >= 1):
            points[13] = 40


def count(totals, points):
    points[14] += one + two + three + four + five + six

print(points)
print(cards)
cards_roll()
print(cards)
print(points)

card_count(cards, totals)
singles(totals, points)
duo(totals, points)
triple(totals, points)
dragon_claw(totals, points)
two_pair(totals, points)
three_two(totals, points)
yar(totals, points)
straight(totals, points)
full_house(totals, points)
count(totals, points)

print(points)