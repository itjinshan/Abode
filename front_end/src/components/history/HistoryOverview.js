import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getCurrentProfile, getHistory } from "../../actions/profileActions";
import { submitReview } from "../../actions/reviewActions";
import { Grid, Chip, Button, Input } from "@material-ui/core/";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core/";

import { Table, TableCell, TableRow } from "@material-ui/core/";
import { isWidthDown } from "@material-ui/core/withWidth";
import withWidth from "@material-ui/core/withWidth";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExitIcon from "@material-ui/icons/ExitToApp";
import DoneIcon from "@material-ui/icons/Done";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import CancelIcon from "@material-ui/icons/Cancel";
import ReviewRating from "./ReviewRating";

import "./history.css";

const styles = {
  table: {
    maxWidth: 330,
    minWidth: 300,
    maxHeight: 50
  },
  paddingDense: {
    paddingTop: 0,
    paddingBottom: 0
  },
  tableCell: {
    maxHeight: 50
  },
  tableNoBorder: {
    maxHeight: 10,

    border: 0
  },
  chipChange: {
    marginLeft: 3,
    backgroundColor: "#FFA500"
  },
  chipCancel: {
    backgroundColor: "#FF4500"
  },
  chipCheckin: {
    backgroundColor: "#3ba711"
  },
  dateChangedFrom: {
    textDecoration: "line-through"
  },
  dateChangedTo: {
    color: "#FFA500"
  },
  backgroundStyle: {
    background: "linear-gradient(45deg, #ffffff 30%, #cfe6fe 90%)"
  },
  ReviewButton: {
    "&:focus": { outline: "none" },
    borderRadius: 17,
    textTransform: "none",
    marginTop: 24,
    marginRight: 10,
    marginLeft: 10,
    paddingTop: 1,
    paddingBottom: 1
  },
  ReviewedButton: {
    "&:focus": { outline: "none" },
    borderRadius: 17,
    textTransform: "none",
    color: "white",
    marginTop: 24,
    marginRight: 10,
    marginLeft: 10,
    paddingTop: 1,
    paddingBottom: 1,
    backgroundColor: "#3ba711"
  },
  reviewFormHeaderText: {
    color: "white"
  },
  ReviewButtonForPhone: {
    "&:focus": { outline: "none" },
    borderRadius: 17,
    textTransform: "none",
    marginLeft: 28,
    paddingLeft: 25.5,
    paddingRight: 25.5
  },
  ReviewedButtonForPhone: {
    "&:focus": { outline: "none" },
    borderRadius: 17,
    textTransform: "none",
    color: "white",
    marginLeft: 28,
    paddingLeft: 18,
    paddingRight: 18,
    backgroundColor: "#3ba711"
  },
  historyHotelImageForPhone: {
    width: "112%"
  },
  HistoryPageTotalSmallForPhone: {
    paddingBottom: 0
  }
};

class HistoryOverview extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getHistory();
  }

  componentWillMount() {
    this.props.getHistory();
  }

  render() {
    const width = this.props.width;
    const { classes, profile } = this.props;
    let bookings;
    let displayChangeChip;
    let displayRegularChip;
    let dateOverview;
    let cancelAndChangeButtons;

    bookings = profile.history.map(booking => {
      displayChangeChip = null;
      displayRegularChip = null;
      dateOverview = null;
      cancelAndChangeButtons = null;

      // if the booking was not changed, we display the regular CheckIn and Checkout Overview
      if (booking.changed === false) {
        displayChangeChip = null;
        dateOverview = (
          <Table className="HistoryContainerDates">
            <TableRow>
              <TableCell
                classes={{
                  paddingDense: classes.paddingDense
                }}
                padding="dense"
                className={classes.tableNoBorder}
              >
                Check In:
              </TableCell>
              <TableCell
                padding="dense"
                align="right"
                className={classes.tableNoBorder}
              >
                {booking.check_in_date}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell padding="dense" className={classes.tableNoBorder}>
                Check Out:
              </TableCell>
              <TableCell
                padding="dense"
                align="right"
                className={classes.tableNoBorder}
              >
                {booking.check_out_date}
              </TableCell>
            </TableRow>
          </Table>
        );
      } else {
        // if the booking was changed, we display a different CheckIn and Checkout Overview, with all 4 dates
        // we also display the "Changed" chip
        displayChangeChip = (
          <Chip
            label="Changed"
            color="primary"
            className={classes.chipChange}
            icon={<SwapHorizIcon />}
          />
        );
        dateOverview = (
          <Table className="HistoryContainerDates">
            <TableRow>
              <TableCell className={classes.tableNoBorder}>Check In:</TableCell>
              <TableCell
                align="right"
                classes={{
                  root: classes.dateChangedFrom
                }}
                className={classes.tableNoBorder}
              >
                {booking.check_in_date}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" className={classes.tableNoBorder} />
              <TableCell
                align="right"
                classes={{
                  root: classes.dateChangedTo
                }}
                className={classes.tableNoBorder}
              >
                {booking.new_check_in_date}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableNoBorder}>
                Check Out:
              </TableCell>
              <TableCell
                align="right"
                classes={{
                  root: classes.dateChangedFrom
                }}
                className={classes.tableNoBorder}
              >
                {booking.check_out_date}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" className={classes.tableNoBorder} />
              <TableCell
                align="right"
                classes={{
                  root: classes.dateChangedTo
                }}
                className={classes.tableNoBorder}
              >
                {booking.new_check_out_date}
              </TableCell>
            </TableRow>
          </Table>
        );
      }

      // here we determine which chip to display. There are four different statuses that each correspond to a chip
      switch (booking.status) {
        case 0:
          displayRegularChip = (
            <Chip
              label="Coming Up"
              color="secondary"
              className={classes.chip}
              icon={<DoneIcon />}
            />
          );
          cancelAndChangeButtons = (
            <Grid>
              <Button>CHANGE</Button>
              <br />
              <Button>CANCEL</Button>
            </Grid>
          );
          break;
        case 1:
          displayRegularChip = (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Chip
                label="Checked In"
                color="primary"
                className={classes.chipCheckin}
                icon={<DoneIcon />}
              />
              {isWidthDown("xs", width) ? (
                booking.status ? (
                  <ReviewRating
                    ReviewButtonStyle={classes.ReviewButtonForPhone}
                    ReviewedButtonStyle={classes.ReviewedButtonForPhone}
                    booking={booking}
                  />
                ) : null
              ) : null}
            </div>
          );
          break;
        case 2:
          displayRegularChip = (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Chip
                label="Checked Out"
                color="primary"
                className={classes.chipCheckout}
                icon={<ExitIcon />}
              />
              {isWidthDown("xs", width) ? (
                booking.status ? (
                  <ReviewRating
                    ReviewButtonStyle={classes.ReviewButtonForPhone}
                    ReviewedButtonStyle={classes.ReviewedButtonForPhone}
                    booking={booking}
                  />
                ) : null
              ) : null}
            </div>
          );
          break;
        case 3:
          displayRegularChip = (
            <Chip
              label="Canceled"
              color="primary"
              className={classes.chipCancel}
              icon={<CancelIcon />}
            />
          );
          break;
        default:
        // code block
      }

      // these are the expansionpanels for all the different bookings
      return (
        <div>
          <ExpansionPanel
            classes={{
              expanded: classes.backgroundStyle
            }}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Grid
                container
                spacing={0}
                direction="row"
                justify="space-evenly"
              >
                <Grid item>
                  <img
                    className={
                      isWidthDown("xs", width)
                        ? classes.historyHotelImageForPhone
                        : "historyHotelImage"
                    }
                    src={booking.img}
                    alt="hotel img"
                  />
                </Grid>

                <Grid className="HistoryContainerHotelName">
                  <Grid item className="HistoryPageHotelName">
                    {booking.hotelName}
                  </Grid>
                  <Grid item className="HistoryPageDestinationName">
                    {booking.destination}
                  </Grid>
                  <Grid item className="chipsAndTotal">
                    <br />
                    {displayRegularChip}
                    {displayChangeChip}
                  </Grid>
                  {/* We display a different layout for small screens */}
                  <Grid item className="chipsAndTotalSmall">
                    <br />
                    <Grid
                      container
                      spacing={0}
                      direction="row"
                      justify="space-between"
                    >
                      <Grid item>{displayRegularChip}</Grid>
                      <Grid
                        item
                        className={
                          isWidthDown("xs", width)
                            ? classes.HistoryPageTotalSmallForPhone
                            : "HistoryPageTotalSmall"
                        }
                      >
                        {isWidthDown("xs", width) ? ( // render this if it is opened on a phone
                          <div style={{ display: "flex", marginTop: 31 }}>
                            <div style={{ marginLeft: 48 }}>Total:</div>
                            <div style={{ marginLeft: 123 }}>
                              $
                              {(booking.subtotal - booking.discount).toFixed(2)}
                            </div>
                          </div>
                        ) : (
                          // render this if it is opened on a laptop
                          "Total: $" +
                          (booking.subtotal - booking.discount).toFixed(2)
                        )}
                      </Grid>
                    </Grid>

                    {displayChangeChip}
                  </Grid>
                </Grid>

                <Grid className="HistoryContainerDates">
                  <Grid item className="HistoryPageDates HistoryContainerDates">
                    {dateOverview}
                  </Grid>
                </Grid>
                <Grid>
                  <Grid item className="HistoryPageTotal">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >
                      Total: ${" "}
                      {(booking.subtotal - booking.discount).toFixed(2)}
                      {booking.status ? (
                        isWidthDown("xs", width) ? (
                          ""
                        ) : (
                          <ReviewRating
                            ReviewButtonStyle={classes.ReviewButton}
                            ReviewedButtonStyle={classes.ReviewedButton}
                            booking={booking}
                          />
                        )
                      ) : null}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid
                container
                spacing={0}
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                <Grid className="HistoryContainerExpand">
                  <Grid
                    item
                    className="HistoryPageText2 HistoryContainerExpand"
                  >
                    <Table className={classes.table}>
                      <TableRow>
                        <TableCell className={classes.tableNoBorder}>
                          Room type:
                        </TableCell>
                        <TableCell
                          align="right"
                          className={classes.tableNoBorder}
                        >
                          {booking.typeOfRoom}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.tableNoBorder}>
                          Number of Rooms:
                        </TableCell>
                        <TableCell
                          align="right"
                          className={classes.tableNoBorder}
                        >
                          {booking.numOfRoom}
                        </TableCell>
                      </TableRow>
                    </Table>
                  </Grid>
                </Grid>

                <Grid>
                  <Grid item className="HistoryPageText2">
                    <Table className={classes.table}>
                      <TableRow>
                        <TableCell className={classes.tableNoBorder}>
                          Subtotal:
                        </TableCell>
                        <TableCell
                          align="right"
                          className={classes.tableNoBorder}
                        >
                          $ {booking.subtotal.toFixed(2)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Discount:</TableCell>
                        <TableCell align="right">
                          {/* $ {booking.discount.toFixed(2)} */}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.tableNoBorder}>
                          Total:
                        </TableCell>
                        <TableCell
                          align="right"
                          className={classes.tableNoBorder}
                        >
                          $ {(booking.subtotal - booking.discount).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </Table>
                  </Grid>
                </Grid>
              </Grid>
              {cancelAndChangeButtons}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      );
    });

    return (
      <div>
        <Grid
          container
          className="HistoryBoxes"
          spacing={0}
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          <Grid item id="HistoryContainerTitle">
            Your Travel History
          </Grid>
        </Grid>
        {bookings}
        <br /> <br />
      </div>
    );
  }
}

HistoryOverview.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  history: state.history
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getHistory, submitReview }
)(withStyles(styles)(withWidth()(HistoryOverview)));
